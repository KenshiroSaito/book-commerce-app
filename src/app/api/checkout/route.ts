import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { title, price, thumbnail, bookId, userId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        bookId: bookId,
      }, 
      client_reference_id: userId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              images: [thumbnail],
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000",
    });

    return NextResponse.json({ checkout_url: session.url });
  } catch (err) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Save the purchased items
export async function POST(request: Request) {
  const { session_id } = await request.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const userId = session.client_reference_id;
    const bookId = session.metadata?.bookId;

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: "Missing purchase information" },
        { status: 400 },
      );
    }

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });

    if (!existingPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: userId,
          bookId: bookId,
        },
      });
      return NextResponse.json({ purchase });
    } else {
      return NextResponse.json({
        message: "You've already purchased this item.",
      });
    }
  } catch (err) {
    // Treat unique constraint violations (already purchased) as success
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json({
        message: "You've already purchased this item.",
      });
    }
    return NextResponse.json(
      { error: "Failed to save purchase" },
      { status: 500 },
    );
  }
}

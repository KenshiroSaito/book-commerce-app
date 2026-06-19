import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const signature = request.headers.get("x-microcms-signature");

  if (
    !process.env.MICROCMS_WEBHOOK_SECRET ||
    signature !== process.env.MICROCMS_WEBHOOK_SECRET
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("books", "max");
  return NextResponse.json({ revalidated: true });
}

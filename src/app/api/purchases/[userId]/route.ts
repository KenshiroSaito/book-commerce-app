import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Purchase Search API
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(purchases);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 },
    );
  }
}

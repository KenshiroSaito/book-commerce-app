import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  revalidateTag("books", "max");
  return NextResponse.json({ revalidated: true });
}

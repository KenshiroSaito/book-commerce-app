import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Purchase } from "@/generated/prisma";
import { getDetailBook } from "@/lib/microcms/client";
import { BookType } from "../types/types";
import PurchasesDetailBook from "../components/PurchasesDetailBook";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  let purchasesDetailBooks: BookType[] = [];

  if (user) {
    const response = await await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" }, // SSR
    );
    const purchasesData = await response.json();

    purchasesDetailBooks = await Promise.all(
      purchasesData.map(async (purchase: Purchase) => {
        return await getDetailBook(purchase.bookId);
      }),
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={user?.image || "/default_icon.png"}
            alt="user profile_icon"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <h2 className="text-lg ml-4 font-semibold">Name: {user?.name}</h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">
        Purchased Article
      </span>
      <div className="flex items-center gap-6">
        {purchasesDetailBooks.map((purchasesDetailBook: BookType) => (
          <PurchasesDetailBook
            key={purchasesDetailBook.id}
            purchasesDetailBook={purchasesDetailBook}
          />
        ))}
      </div>
    </div>
  );
}

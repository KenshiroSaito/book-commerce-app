import { getAllBooks } from "@/lib/microcms/client";
import Book from "./components/Book";
import { BookType, PurchaseType } from "./types/types";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Home() {
  const { contents } = await getAllBooks();
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  let purchaseBookIds: string[] = [];

  if (user) {
    try {
      const response = await await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
        { cache: "no-store" }, // SSR
      );
      const purchasesData = await response.json();

      purchaseBookIds = purchasesData.map(
        (purchaseBook: PurchaseType) => purchaseBook.bookId,
      );
    } catch (err) {
      console.error("Failed to fetch purchases:", err);
    }
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds.includes(book.id)}
          />
        ))}
      </main>
    </>
  );
}

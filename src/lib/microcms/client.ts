import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";
import next from "next";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "ecourcecommerce",
    customRequestInit: {
      next: { tags: ["books"] },
    },
  });

  return allBooks;
};

export const getDetailBook = async (contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "ecourcecommerce",
    contentId,
    customRequestInit: {
      next: { tags: ["books"] },
    },
  });

  return detailBook;
};

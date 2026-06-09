type BookType = {
  id: string;
  title: string;
  content: string;
  price: number;
  thumbnail: { url: string; height: number; width: number };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type PurchaseType = {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
};

export type { BookType, PurchaseType };

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

type HeaderProps = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  } | null;
};

export type { BookType, PurchaseType, HeaderProps };

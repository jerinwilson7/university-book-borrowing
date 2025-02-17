import { Book, Star } from "@/assets/icons";
import { BookInfo, BorrowBookBtn } from "@/components/atoms";
import { BookCover } from "@/components/molecules";
import { eq } from "drizzle-orm";
import { db } from "../../../../database/drizzle";
import { users } from "../../../../database/schema";

interface BookOverviewProps extends Book {
  userId: string;
}

export const BookOverview = async ({
  author,
  availableCopies,
  coverColor,
  coverUrl,
  description,
  genre,
  id,
  rating,
  summary,
  title,
  totalCopies,
  videoUrl,
  userId,
}: BookOverviewProps) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is out of stock"
        : "You are not eligible to borrow this book",
  };

  return (
    <section className="book-overview">
      <div className="flex flex-col gap-7 flex-1">
        <h1>{title}</h1>
        <div className="book-info">
          <BookInfo label="By" value={author} />
          <BookInfo label="Category " value={genre} />
          <BookInfo icon={Star} value={genre} />
        </div>

        <div className="book-copies">
          <BookInfo label="Total Books" value={String(totalCopies)} />
          <BookInfo label="Available Books" value={String(availableCopies)} />
        </div>

        <p className="book-description">{description}</p>

        {user && (
          <BorrowBookBtn
            userId={userId}
            bookId={id}
            borrowingEligibility={borrowingEligibility}
          />
        )}
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverUrl={coverUrl}
          />
        </div>
        <div className="absolute opacity-60 right-10 rotate-12 top-4 blur-sm hidden xl:block">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverUrl={coverUrl}
          />
        </div>
      </div>
    </section>
  );
};

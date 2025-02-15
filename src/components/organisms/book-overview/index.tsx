import { Book, Star } from "@/assets/icons";
import { BookInfo } from "@/components/atoms";
import { BookCover } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface BookOverviewProps extends Book {
  userId: string;
}

export const BookOverview = ({
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

        <Button className="book-overview_btn">
          <Image width={20} height={20} src={Book} alt="Book" />
          <span className="font-bebas-neue text-xl text-dark-100 ">
            BORROW BOOK REQUEST
          </span>
        </Button>
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

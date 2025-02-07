import { BookCard } from "@/components/molecules";

interface BookListProps {
  title: string;
  books: Book[];
  containerClassName: string;
}

export const BookList = ({
  books,
  containerClassName,
  title,
}: BookListProps) => {
  return (
    <section className={containerClassName}>
      <h1 className="font-bebas-neue text-4xl text-light-100 ">{title}</h1>
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

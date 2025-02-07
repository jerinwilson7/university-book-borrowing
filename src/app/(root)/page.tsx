import { BookList, BookOverview } from "@/components/organisms";
import { sampleBooks } from "@/constants";

function Home() {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        books={sampleBooks}
        containerClassName="mt-28"
        title="POPULAR BOOKS"
      />
    </>
  );
}

export default Home;

import { BookList, BookOverview } from "@/components/organisms";
import { sampleBooks } from "@/constants";

const Home = async () => {
  return (
    <>
      <BookOverview {...sampleBooks[7]} />
      <BookList
        books={sampleBooks}
        containerClassName="mt-28"
        title="POPULAR BOOKS"
      />
    </>
  );
};

export default Home;

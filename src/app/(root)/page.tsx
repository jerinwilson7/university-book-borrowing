import { BookList, BookOverview } from "@/components/organisms";
import { sampleBooks } from "@/constants";
import { db } from "../../../database/drizzle";
import { users } from "../../../database/schema";

const Home = async () => {
  try {
    const result = await db.select().from(users);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.log("ERROR :", error);
  }
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
};

export default Home;

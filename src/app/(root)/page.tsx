import { auth } from "@/auth";
import { BookList, BookOverview } from "@/components/organisms";
import { desc } from "drizzle-orm";
import { db } from "../../../database/drizzle";
import { books } from "../../../database/schema";

const Home = async () => {
  const session = await auth()
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createAt))) as Book[];
  return (
    <>
      <BookOverview {...latestBooks[0]}  userId={session?.user?.id as string} />
      <BookList
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
        title="POPULAR BOOKS"
      />
    </>
  );
};

export default Home;

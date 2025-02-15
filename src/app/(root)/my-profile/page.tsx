import { signOut } from "@/auth";
import { BookList } from "@/components/organisms";
import { Button } from "@/components/ui/button";
import { desc } from "drizzle-orm";
import { db } from "../../../../database/drizzle";
import { books } from "../../../../database/schema";

async function MyProfile() {
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createAt))) as Book[];
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button>Logout</Button>
      </form>
      <BookList
        books={latestBooks}
        title="Borrowed Books"
        containerClassName="mt-10"
      />
    </>
  );
}

export default MyProfile;

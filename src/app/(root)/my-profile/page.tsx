import { auth } from "@/auth";
import { BookList, UserProfile } from "@/components/organisms";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "../../../../database/drizzle";
import { books } from "../../../../database/schema";

async function MyProfile() {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createAt))) as Book[];

  return (
    <div className="flex flex-1">
      <UserProfile session={session} />
      <BookList
        books={latestBooks}
        title="Borrowed Books"
        containerClassName="mt-10"
      />
    </div>
  );
}

export default MyProfile;

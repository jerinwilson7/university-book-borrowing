import { auth } from "@/auth";
import { BookVideo } from "@/components/molecules";
import { BookOverview } from "@/components/organisms";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "../../../../../database/drizzle";
import { books } from "../../../../../database/schema";

async function BookDetail({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const id = (await params).id;

  const [book] = await db.select().from(books).where(eq(books.id, id)).limit(1);

  if (!book) redirect("/");

  return (
    <>
      <BookOverview {...book} userId={session?.user?.id as string} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={book.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {book.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
        {/* SIMILAR BOOKS */}
      </div>
    </>
  );
}

export default BookDetail;

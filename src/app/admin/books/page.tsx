import { Button } from "@/components/ui/button";
import Link from "next/link";

function Books() {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-xl ">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Add a new book
          </Link>
        </Button>
      </div>
      <div className="w-full mt-7 overflow-hidden">
        <p>table</p>
      </div>
    </section>
  );
}

export default Books;

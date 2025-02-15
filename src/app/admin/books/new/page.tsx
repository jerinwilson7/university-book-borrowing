import { BookForm } from "@/components/admin-components/organisms";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function AddNewBook() {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>
      <section className="w-full max-2xl">
        <BookForm type="create" />
      </section>
    </>
  );
}

export default AddNewBook;

import { signOut } from "@/auth";
import { BookList } from "@/components/organisms";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";

function MyProfile() {
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
        books={sampleBooks}
        title="Borrowed Books"
        containerClassName="mt-10"
      />
    </>
  );
}

export default MyProfile;

import { Receipt } from "@/assets/icons";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import Image from "next/image";
import { db } from "../../../../database/drizzle";
import { users } from "../../../../database/schema";

interface UserProfileProps {
  session: Session;
}

export const UserProfile = async ({ session }: UserProfileProps) => {
  if (!session.user?.id) return;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  console.log(user);
  return (
    <div>
      <Image src={Receipt} alt="receipt" width={50} height={50} />
    </div>
  );
};

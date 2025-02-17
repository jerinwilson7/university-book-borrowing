import { Logo, LogOutIcon } from "@/assets/icons";
import { signOut } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  session: Session;
}

export const Header = ({ session }: HeaderProps) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src={Logo} alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center justify-center gap-8">
        <li>
          <Link
            href="/"
            className={cn("text-base cursor-pointer capitalize text-light-200")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className="text-light-100 text-base cursor-pointer capitalize"
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            href="/my-profile"
            className="text-light-100 text-sm cursor-pointer capitalize flex gap-1.5 items-center justify-center"
          >
            <Avatar>
              <AvatarFallback className="bg-blue-300 text-blue-950">
                {getInitials(session.user?.name ?? "IN")}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold text-blue-200 text-xl capitalize ">
              {session.user?.name?.split(" ")[0]}
            </p>
          </Link>
        </li>
        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className=""
          >
            <button>
              <Image
                src={LogOutIcon}
                alt="logout icon"
                width={24}
                height={24}
              />
            </button>
          </form>
        </li>
      </ul>
    </header>
  );
};

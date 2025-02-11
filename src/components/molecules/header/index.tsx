"use client";

import { Logo } from "@/assets/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  session: Session;
}

export const Header = ({ session }: HeaderProps) => {
  const pathName = usePathname();

  return (
    <header className="flex justify-between gap-5 items-center w-full mt-14">
      <Link href="/" className="flex gap-1 justify-center items-center">
        <Image src={Logo} alt="book-wise-logo" height={40} width={40} />
        <span className="font-ibm-plex-sans font-semibold text-white text-3xl">
          BookWise
        </span>
      </Link>
      <ul className="flex gap-8 items-center">
        <li>
          <Link
            href="/"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName === "/" ? "text-light-200" : "text-light-100"
            )}
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
            className="text-light-100 text-base cursor-pointer capitalize"
          >
            <Avatar>
              <AvatarFallback className="bg-amber-100 text-blue-950">
                {getInitials(session.user?.name ?? "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

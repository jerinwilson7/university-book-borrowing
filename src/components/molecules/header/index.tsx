"use client";

import { Logo } from "@/assets/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathName = usePathname();

  return (
    <header className="flex justify-between gap-5 items-center w-full">
      <Link href="/" className="flex gap-1 justify-center items-center">
        <Image src={Logo} alt="book-wise-logo" height={40} width={40} />
        <span className="font-ibm-plex-sans font-semibold text-white text-3xl">
          BookWise
        </span>
      </Link>
      <ul className="flex gap-8">
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
      </ul>
    </header>
  );
};

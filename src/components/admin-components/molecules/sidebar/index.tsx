"use client";

import { AdminLogo } from "@/assets/icons";
import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  session: Session;
}

export const Sidebar = ({ session }: SidebarProps) => {
  const pathName = usePathname();
  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image src={AdminLogo} alt="logo" width={37} height={37} />
          <h1>BookWise</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathName.includes(link.route) &&
                link.route.length > 1) ||
              pathName === link.route;
            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn("link", isSelected && "bg-blue-700 shadow-sm")}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      height={20}
                      width={20}
                      className={`${isSelected ? "brightness-0 invert" : ""}  object-contain`}
                    />
                  </div>

                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user items-center">
        <Avatar>
          <AvatarFallback className="bg-amber-100 text-blue-950 p-2 rounded-full">
            {getInitials(session.user?.name ?? "IN")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-base capitalize">
            {session.user?.name}
          </p>
          <p className="font-normal text-light-500 text-sm">
            {session.user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

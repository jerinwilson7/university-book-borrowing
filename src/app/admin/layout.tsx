import { AdminHeader, Sidebar } from "@/admin-components/molecules";
import { auth } from "@/auth";
import "@/styles/admin.css";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");
  return (
    <main className="flex min-h-screen w-full">
      <Sidebar session={session} />
      <div className="admin-container">
        <AdminHeader session={session} />
        {children}
      </div>
    </main>
  );
};

export default Layout;

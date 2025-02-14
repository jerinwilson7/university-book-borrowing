import { Session } from "next-auth";

interface AdminHeaderProps {
  session: Session;
}

export const AdminHeader = ({ session }: AdminHeaderProps) => {
  return (
    <header className="admin-header">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-semibold text-2xl capitalize">
          Welcome, {session.user?.name}
        </h2>
        <p className="text-base font-normal text-slate-500">
          Monitor all of your projects and tasks here
        </p>
      </div>
      {/* SEARCH BAR */}
    </header>
  );
};

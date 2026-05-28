import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { NotificationBell } from "@/components/admin/NotificationBell";
import { Loader2 } from "lucide-react";


export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-semibold tracking-tight">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user.email}) doesn't have the <code className="rounded bg-muted px-1 py-0.5">admin</code> role.
            Grant yourself access via SQL:
          </p>
          <pre className="mt-3 overflow-x-auto rounded bg-muted p-3 text-left text-[11px]">{`insert into user_roles (user_id, role) values ('${user.id}', 'admin');`}</pre>
          <button onClick={() => navigate({ to: "/login" })} className="mt-4 text-sm text-primary underline">
            Back to sign in
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-end gap-2 border-b border-border bg-background/80 px-6 backdrop-blur">
          <NotificationBell />
        </header>
        <Outlet />
      </main>
    </div>
  );
}

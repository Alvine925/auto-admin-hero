import { Link, useLocation } from "@tanstack/react-router";
import { Crown, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TABLE_CONFIGS, TABLE_GROUPS } from "./table-config";

export function AdminSidebar() {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-sidebar-accent">
          <Crown className="h-4 w-4 text-gold" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Admin Console</div>
          <div className="text-[11px] uppercase tracking-wider text-sidebar-foreground/60">Prestige</div>
        </div>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        <Link
          to="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
            pathname === "/dashboard"
              ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-gold"
              : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Overview
        </Link>

        {TABLE_GROUPS.map(({ group, tables }) => (
          <div key={group}>
        {TABLE_GROUPS.map(({ group, tables }) => (
          <div key={group} className="pt-2">
            <div className="mb-2 flex items-center gap-2 px-3">
              <span className="h-px flex-1 bg-gold/30" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                {group}
              </span>
              <span className="h-px flex-1 bg-gold/30" />
            </div>

              {tables.map((t) => {
                const to = `/dashboard/t/${t}`;
                const active = pathname.startsWith(to);
                const cfg = TABLE_CONFIGS[t];
                return (
                  <Link
                    key={t}
                    to="/dashboard/t/$table"
                    params={{ table: t }}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-md px-3 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-gold"
                        : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                    )}
                  >
                    <span className="truncate">{cfg.label}</span>
                    <ChevronRight className="h-3 w-3 opacity-40" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="mb-2 truncate px-2 text-xs text-sidebar-foreground/60">{user?.email}</div>
        <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground">
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </div>
    </aside>
  );
}

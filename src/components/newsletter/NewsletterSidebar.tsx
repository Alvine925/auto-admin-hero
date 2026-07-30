import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Mail, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { NEWSLETTERS } from "@/lib/newsletters";

export function NewsletterSidebar() {
  const params = useParams({ strict: false }) as { id?: string };

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-sidebar-accent">
          <Mail className="h-4 w-4 text-gold" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Newsletters</div>
          <div className="text-[11px] uppercase tracking-wider text-sidebar-foreground/60">Tellus Jobs</div>
        </div>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        <Link
          to="/newsletters"
          activeOptions={{ exact: true }}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          activeProps={{
            className:
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-gold",
          }}
        >
          <LayoutDashboard className="h-4 w-4" />
          Overview
        </Link>

        <div className="pt-2">
          <div className="mb-2 flex items-center gap-2 px-3">
            <span className="h-px flex-1 bg-gold/30" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Templates</span>
            <span className="h-px flex-1 bg-gold/30" />
          </div>
          <div className="space-y-0.5">
            {NEWSLETTERS.map((n) => (
              <Link
                key={n.id}
                to="/newsletters/$id"
                params={{ id: n.id }}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors",
                  params.id === n.id
                    ? "border-l-2 border-gold bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                )}
              >
                <div className="truncate font-medium">{n.title}</div>
                <div className="truncate text-[11px] text-sidebar-foreground/50">{n.subject}</div>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to admin console
        </Link>
      </div>
    </aside>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getUserJourney, type JourneyEvent } from "@/lib/journey.functions";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus, LogIn, FileText, Plug, Briefcase, Send, Workflow,
  Bot, Bell, MessageSquare, AlertTriangle, Users, Activity, ExternalLink, Loader2,
} from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/dashboard/journey/$userId")({
  head: () => ({ meta: [{ title: "User Journey — Admin" }] }),
  component: JourneyPage,
});

const CATEGORY_META: Record<JourneyEvent["category"], { label: string; icon: any; color: string }> = {
  signup:       { label: "Signup",       icon: UserPlus,      color: "text-emerald-500" },
  auth:         { label: "Auth",         icon: LogIn,         color: "text-blue-500" },
  profile:      { label: "Profile",      icon: UserPlus,      color: "text-indigo-500" },
  cv:           { label: "CV",           icon: FileText,      color: "text-violet-500" },
  integration:  { label: "Integration",  icon: Plug,          color: "text-cyan-500" },
  job:          { label: "Job",          icon: Briefcase,     color: "text-amber-500" },
  application:  { label: "Application",  icon: Send,          color: "text-orange-500" },
  workflow:     { label: "Workflow",     icon: Workflow,      color: "text-pink-500" },
  ai:           { label: "AI",           icon: Bot,           color: "text-purple-500" },
  notification: { label: "Notification", icon: Bell,          color: "text-sky-500" },
  feedback:     { label: "Feedback",     icon: MessageSquare, color: "text-teal-500" },
  error:        { label: "Error",        icon: AlertTriangle, color: "text-red-500" },
  referral:     { label: "Referral",     icon: Users,         color: "text-fuchsia-500" },
  usage:        { label: "Usage",        icon: Activity,      color: "text-muted-foreground" },
};

const ALL_CATEGORIES = Object.keys(CATEGORY_META) as JourneyEvent["category"][];

function JourneyPage() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const fetchJourney = useServerFn(getUserJourney);
  const [filter, setFilter] = useState<Set<JourneyEvent["category"]>>(new Set(ALL_CATEGORIES));

  const { data, isLoading, error } = useQuery({
    queryKey: ["journey", userId],
    queryFn: () => fetchJourney({ data: { userId, limitPerSource: 150 } }),
  });

  const filtered = useMemo(
    () => (data?.events ?? []).filter((e) => filter.has(e.category)),
    [data, filter],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    (data?.events ?? []).forEach((e) => (c[e.category] = (c[e.category] ?? 0) + 1));
    return c;
  }, [data]);

  function toggle(cat: JourneyEvent["category"]) {
    setFilter((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      if (next.size === 0) return new Set(ALL_CATEGORIES);
      return next;
    });
  }

  const p = data?.profile;

  return (
    <>
      <PageHeader
        title={p ? (p.full_name || p.email || "User journey") : "User Journey"}
        description={p ? `${p.email ?? ""} · plan: ${p.current_plan ?? "free"} · joined ${p.created_at ? new Date(p.created_at).toLocaleDateString() : "—"}` : userId}
      />
      <PageBody>
        <Card className="p-4">
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              const Icon = meta.icon;
              const active = filter.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggle(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition ${
                    active ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className={`h-3 w-3 ${meta.color}`} />
                  {meta.label}
                  <span className="ml-1 tabular-nums opacity-70">{counts[cat] ?? 0}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 p-10 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading journey…
            </div>
          ) : error ? (
            <div className="p-6 text-sm text-destructive">Failed to load journey: {(error as Error).message}</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">No events for this user.</div>
          ) : (
            <ol className="relative border-l border-border ml-6 py-4 pr-4">
              {filtered.map((e) => {
                const meta = CATEGORY_META[e.category];
                const Icon = meta.icon;
                return (
                  <li key={e.id} className="relative pl-8 py-3">
                    <span className={`absolute -left-3 grid h-6 w-6 place-items-center rounded-full border border-border bg-background ${meta.color}`}>
                      <Icon className="h-3 w-3" />
                    </span>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <Badge variant="secondary" className="text-[10px] uppercase">{meta.label}</Badge>
                      <span className="text-sm font-medium">{e.title}</span>
                      <span className="ml-auto text-[11px] tabular-nums text-muted-foreground">
                        {new Date(e.at).toLocaleString()}
                      </span>
                    </div>
                    {e.description && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{e.description}</p>
                    )}
                    {e.link && (
                      <button
                        onClick={() => navigate({ to: "/dashboard/t/$table/$id", params: { table: e.link!.table, id: e.link!.id } })}
                        className="mt-1 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Open {e.link.table} record
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </Card>

        <div className="text-xs text-muted-foreground">
          <Link to="/dashboard/documents/$userId" params={{ userId }} className="text-primary hover:underline">
            View documents →
          </Link>
        </div>
      </PageBody>
    </>
  );
}

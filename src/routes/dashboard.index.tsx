import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/admin/StatCard";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Users, Briefcase, FileText, Send, TrendingUp, Database, AlertTriangle, Crown } from "lucide-react";
import { StatusBadge, formatDateTime, truncate } from "@/components/admin/format";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Overview — Admin" }] }),
  component: OverviewPage,
});

async function fetchStats() {
  const head = { count: "exact" as const, head: true };
  const since30d = new Date(Date.now() - 30 * 86400_000).toISOString();
  const since7d = new Date(Date.now() - 7 * 86400_000).toISOString();

  const [users, jobs, apps, sent, scraped, upgraded, errors, newUsers7] = await Promise.all([
    supabase.from("profiles").select("*", head),
    supabase.from("jobs").select("*", head),
    supabase.from("applications").select("*", head),
    supabase.from("applications").select("*", head).eq("status", "sent"),
    supabase.from("scraped_jobs").select("*", head).gte("scraped_at", since30d),
    supabase.from("profiles").select("*", head).eq("current_plan", "upgraded"),
    supabase.from("error_reports").select("*", head).gte("created_at", since7d),
    supabase.from("profiles").select("*", head).gte("created_at", since7d),
  ]);

  return {
    users: users.count ?? 0,
    jobs: jobs.count ?? 0,
    apps: apps.count ?? 0,
    sent: sent.count ?? 0,
    scraped: scraped.count ?? 0,
    upgraded: upgraded.count ?? 0,
    errors: errors.count ?? 0,
    newUsers7: newUsers7.count ?? 0,
  };
}

async function fetchTrends() {
  const since = new Date(Date.now() - 30 * 86400_000).toISOString();
  const [{ data: signups }, { data: appsRaw }, { data: scraped }] = await Promise.all([
    supabase.from("profiles").select("created_at").gte("created_at", since).limit(5000),
    supabase.from("applications").select("created_at,status").gte("created_at", since).limit(5000),
    supabase.from("scraped_jobs").select("source").gte("scraped_at", since).limit(5000),
  ]);

  const days: Record<string, { date: string; signups: number; apps: number }> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400_000).toISOString().slice(0, 10);
    days[d] = { date: d.slice(5), signups: 0, apps: 0 };
  }
  signups?.forEach((r) => { const k = r.created_at?.slice(0, 10); if (k && days[k]) days[k].signups++; });
  appsRaw?.forEach((r) => { const k = r.created_at?.slice(0, 10); if (k && days[k]) days[k].apps++; });

  const sourceCounts: Record<string, number> = {};
  scraped?.forEach((s) => { const k = s.source || "unknown"; sourceCounts[k] = (sourceCounts[k] || 0) + 1; });

  return {
    timeline: Object.values(days),
    sources: Object.entries(sourceCounts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 6),
  };
}

async function fetchRecent() {
  const [{ data: apps }, { data: users }, { data: errs }] = await Promise.all([
    supabase.from("applications").select("id,job_title,company,status,created_at").order("created_at", { ascending: false }).limit(6),
    supabase.from("profiles").select("id,full_name,email,current_plan,created_at").order("created_at", { ascending: false }).limit(6),
    supabase.from("error_reports").select("id,error_message,section,created_at").order("created_at", { ascending: false }).limit(5),
  ]);
  return { apps: apps ?? [], users: users ?? [], errs: errs ?? [] };
}

const PIE_COLORS = ["var(--primary)", "var(--gold)", "var(--success)", "var(--warning)", "var(--chart-4)", "var(--chart-5)"];

function OverviewPage() {
  const { data: stats } = useQuery({ queryKey: ["admin", "stats"], queryFn: fetchStats });
  const { data: trends } = useQuery({ queryKey: ["admin", "trends"], queryFn: fetchTrends });
  const { data: recent } = useQuery({ queryKey: ["admin", "recent"], queryFn: fetchRecent });

  return (
    <>
      <PageHeader title="Overview" description="Snapshot of platform activity, users, and applications." />
      <PageBody>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Users" value={stats?.users ?? "—"} hint={`+${stats?.newUsers7 ?? 0} in last 7 days`} icon={Users} accent="primary" />
          <StatCard label="Upgraded Plans" value={stats?.upgraded ?? "—"} hint="Currently active" icon={Crown} accent="gold" />
          <StatCard label="Applications Sent" value={stats?.sent ?? "—"} hint={`${stats?.apps ?? 0} total drafts + sent`} icon={Send} accent="success" />
          <StatCard label="Errors (7d)" value={stats?.errors ?? "—"} hint="Client-reported errors" icon={AlertTriangle} accent="warning" />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Activity — last 30 days</h3>
                <p className="text-xs text-muted-foreground">New signups and applications per day</p>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends?.timeline ?? []}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="signups" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="apps" stroke="var(--gold)" fill="url(#g2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Scrape Sources</h3>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <Database className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={trends?.sources ?? []} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                    {(trends?.sources ?? []).map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Recent Applications</h3>
            </div>
            <ul className="divide-y divide-border">
              {recent?.apps.map((a) => (
                <li key={a.id} className="py-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{a.job_title || "Untitled"}</div>
                      <div className="truncate text-xs text-muted-foreground">{a.company || "—"} · {formatDateTime(a.created_at)}</div>
                    </div>
                    <StatusBadge value={a.status} />
                  </div>
                </li>
              ))}
              {recent && recent.apps.length === 0 && <li className="py-6 text-center text-sm text-muted-foreground">No applications yet</li>}
            </ul>
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">New Users</h3>
            </div>
            <ul className="divide-y divide-border">
              {recent?.users.map((u) => (
                <li key={u.id} className="py-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{u.full_name || u.email || "—"}</div>
                      <div className="truncate text-xs text-muted-foreground">{u.email} · {formatDateTime(u.created_at)}</div>
                    </div>
                    <StatusBadge value={u.current_plan} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h3 className="text-sm font-semibold">Recent Errors</h3>
            </div>
            <ul className="divide-y divide-border">
              {recent?.errs.map((e) => (
                <li key={e.id} className="py-2.5">
                  <div className="text-sm font-medium text-foreground">{truncate(e.error_message, 80)}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{e.section || "unknown"} · {formatDateTime(e.created_at)}</div>
                </li>
              ))}
              {recent && recent.errs.length === 0 && <li className="py-6 text-center text-sm text-muted-foreground">No recent errors 🎉</li>}
            </ul>
          </Card>
        </div>
      </PageBody>
    </>
  );
}

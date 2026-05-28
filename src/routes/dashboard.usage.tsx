import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const Route = createFileRoute("/dashboard/usage")({
  head: () => ({ meta: [{ title: "Usage — Admin" }] }),
  component: UsagePage,
});

function UsagePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "usage"],
    queryFn: async () => {
      const since = new Date(Date.now() - 30 * 86400_000).toISOString();
      const { data, error } = await supabase
        .from("usage_tracking")
        .select("action_type,created_at")
        .gte("created_at", since)
        .limit(10000);
      if (error) throw error;

      const byAction: Record<string, number> = {};
      const byDay: Record<string, number> = {};
      for (let i = 29; i >= 0; i--) {
        const k = new Date(Date.now() - i * 86400_000).toISOString().slice(0, 10);
        byDay[k] = 0;
      }
      data.forEach((r) => {
        byAction[r.action_type] = (byAction[r.action_type] || 0) + 1;
        const k = r.created_at?.slice(0, 10);
        if (k && byDay[k] !== undefined) byDay[k]++;
      });
      return {
        actions: Object.entries(byAction).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value),
        days: Object.entries(byDay).map(([date, value]) => ({ date: date.slice(5), value })),
        total: data.length,
      };
    },
  });

  return (
    <>
      <PageHeader title="Usage Tracking" description="Actions performed by users in the last 30 days." />
      <PageBody>
        <Card className="p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold">Daily actions</h3>
            <p className="text-xs text-muted-foreground">{isLoading ? "Loading…" : `${data?.total ?? 0} total actions tracked`}</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.days ?? []}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Actions by type</h3>
          <div className="space-y-2">
            {data?.actions.map((a) => {
              const max = data.actions[0]?.value ?? 1;
              const pct = Math.round((a.value / max) * 100);
              return (
                <div key={a.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium capitalize">{a.name.replaceAll("_", " ")}</span>
                    <span className="tabular-nums text-muted-foreground">{a.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-gold" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            {!isLoading && (data?.actions.length ?? 0) === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">No usage data in the last 30 days.</p>
            )}
          </div>
        </Card>
      </PageBody>
    </>
  );
}

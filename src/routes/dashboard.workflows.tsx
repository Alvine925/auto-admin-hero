import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge, formatDateTime } from "@/components/admin/format";
import { UserLink } from "@/components/admin/UserLink";

export const Route = createFileRoute("/dashboard/workflows")({
  head: () => ({ meta: [{ title: "Workflows — Admin" }] }),
  component: WorkflowsPage,
});

type Wf = {
  id: string; name: string; user_id: string; active: boolean | null;
  application_mode: string; auto_apply: boolean | null; min_match_score: number | null;
  max_applications: number | null; run_time: string | null;
  target_roles: string[] | null; target_counties: string[] | null; created_at: string;
};

function WorkflowsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "workflows"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workflows")
        .select("id,name,user_id,active,application_mode,auto_apply,min_match_score,max_applications,run_time,target_roles,target_counties,created_at")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data as Wf[];
    },
  });

  const columns: Column<Wf>[] = [
    { key: "name", header: "Workflow", render: (r) => <div className="font-medium">{r.name}</div> },
    { key: "active", header: "Status", render: (r) => <StatusBadge value={r.active ? "active" : "draft"} /> },
    { key: "mode", header: "Mode", render: (r) => (
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {r.application_mode}{r.auto_apply && " · auto"}
      </span>
    )},
    { key: "min", header: "Min match", render: (r) => <span className="tabular-nums">{r.min_match_score ?? "—"}%</span> },
    { key: "max", header: "Max/day", render: (r) => <span className="tabular-nums">{r.max_applications ?? "—"}</span> },
    { key: "roles", header: "Target roles", render: (r) => (
      <span className="text-xs text-muted-foreground">{r.target_roles?.slice(0, 3).join(", ") || "—"}{(r.target_roles?.length ?? 0) > 3 && "…"}</span>
    )},
    { key: "counties", header: "Counties", render: (r) => (
      <span className="text-xs text-muted-foreground">{r.target_counties?.slice(0, 3).join(", ") || "—"}</span>
    )},
    { key: "created", header: "Created", render: (r) => <span className="text-xs text-muted-foreground">{formatDateTime(r.created_at)}</span> },
  ];

  return (
    <>
      <PageHeader title="Workflows" description="Automation workflows configured by users." />
      <PageBody>
        <DataTable data={data} columns={columns} loading={isLoading} rowKey={(r) => r.id} searchKeys={["name"]} />
      </PageBody>
    </>
  );
}

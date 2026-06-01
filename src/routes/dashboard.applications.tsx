import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge, formatDateTime } from "@/components/admin/format";
import { UserLink } from "@/components/admin/UserLink";

export const Route = createFileRoute("/dashboard/applications")({
  head: () => ({ meta: [{ title: "Applications — Admin" }] }),
  component: ApplicationsPage,
});

type App = {
  id: string; job_title: string | null; company: string | null;
  status: string; application_mode: string; application_type: string;
  sent_at: string | null; created_at: string; match_score: number | null;
  sent_via: string | null; user_id: string;
};

function ApplicationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("id,job_title,company,status,application_mode,application_type,sent_at,created_at,match_score,sent_via,user_id")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data as App[];
    },
  });

  const columns: Column<App>[] = [
    { key: "title", header: "Job", render: (r) => (
      <div>
        <div className="font-medium text-foreground">{r.job_title || "Untitled"}</div>
        <div className="text-xs text-muted-foreground">{r.company || "—"}</div>
      </div>
    )},
    { key: "status", header: "Status", render: (r) => <StatusBadge value={r.status} /> },
    { key: "mode", header: "Mode", render: (r) => (
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{r.application_mode} · {r.application_type}</span>
    )},
    { key: "match", header: "Match", render: (r) => r.match_score != null ? <span className="tabular-nums text-success">{r.match_score}%</span> : <span className="text-muted-foreground">—</span> },
    { key: "via", header: "Sent via", render: (r) => <span className="text-xs text-muted-foreground">{r.sent_via || "—"}</span> },
    { key: "sent", header: "Sent at", render: (r) => <span className="text-xs text-muted-foreground">{formatDateTime(r.sent_at)}</span> },
    { key: "created", header: "Created", render: (r) => <span className="text-xs text-muted-foreground">{formatDateTime(r.created_at)}</span> },
  ];

  return (
    <>
      <PageHeader title="Applications" description="All applications drafted or sent by users." />
      <PageBody>
        <DataTable data={data} columns={columns} loading={isLoading} rowKey={(r) => r.id} searchKeys={["job_title", "company", "status"]} />
      </PageBody>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge, formatDateTime } from "@/components/admin/format";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/dashboard/jobs")({
  head: () => ({ meta: [{ title: "Saved Jobs — Admin" }] }),
  component: JobsPage,
});

type Job = {
  id: string; title: string; company: string | null; location: string | null;
  source: string | null; source_url: string | null; tracker_status: string;
  match_score: number | null; created_at: string; user_id: string;
};

function JobsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("id,title,company,location,source,source_url,tracker_status,match_score,created_at,user_id")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data as Job[];
    },
  });

  const columns: Column<Job>[] = [
    { key: "title", header: "Job", render: (r) => (
      <div>
        <div className="font-medium text-foreground">{r.title}</div>
        <div className="text-xs text-muted-foreground">{r.company || "—"} · {r.location || "—"}</div>
      </div>
    )},
    { key: "match", header: "Match", render: (r) => (
      r.match_score != null
        ? <span className="rounded-md bg-success/10 px-2 py-1 text-xs font-semibold tabular-nums text-success">{r.match_score}%</span>
        : <span className="text-muted-foreground">—</span>
    )},
    { key: "status", header: "Status", render: (r) => <StatusBadge value={r.tracker_status} /> },
    { key: "source", header: "Source", render: (r) => <span className="text-xs text-muted-foreground">{r.source || "—"}</span> },
    { key: "url", header: "", render: (r) => r.source_url ? (
      <a href={r.source_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary"><ExternalLink className="h-4 w-4" /></a>
    ) : null },
    { key: "created", header: "Saved", render: (r) => <span className="text-xs text-muted-foreground">{formatDateTime(r.created_at)}</span> },
  ];

  return (
    <>
      <PageHeader title="Saved Jobs" description="Jobs users have saved to their tracker." />
      <PageBody>
        <DataTable data={data} columns={columns} loading={isLoading} rowKey={(r) => r.id} searchKeys={["title", "company", "location", "source"]} />
      </PageBody>
    </>
  );
}

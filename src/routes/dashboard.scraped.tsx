import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { formatDateTime } from "@/components/admin/format";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/dashboard/scraped")({
  head: () => ({ meta: [{ title: "Scraped Jobs — Admin" }] }),
  component: ScrapedPage,
});

type Scraped = {
  id: string; title: string; company: string | null; location: string | null;
  site: string; source: string | null; source_url: string;
  job_type: string | null; is_remote: boolean | null;
  posted_at: string | null; scraped_at: string;
};

function ScrapedPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "scraped_jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scraped_jobs")
        .select("id,title,company,location,site,source,source_url,job_type,is_remote,posted_at,scraped_at")
        .order("scraped_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data as Scraped[];
    },
  });

  const columns: Column<Scraped>[] = [
    { key: "title", header: "Job", render: (r) => (
      <div>
        <div className="font-medium text-foreground">{r.title}</div>
        <div className="text-xs text-muted-foreground">{r.company || "—"} · {r.location || "—"}</div>
      </div>
    )},
    { key: "site", header: "Site", render: (r) => <span className="rounded bg-muted px-2 py-1 text-xs font-medium">{r.site}</span> },
    { key: "type", header: "Type", render: (r) => (
      <div className="text-xs text-muted-foreground">
        {r.job_type || "—"}{r.is_remote && <span className="ml-1 rounded bg-success/10 px-1.5 py-0.5 text-success">remote</span>}
      </div>
    )},
    { key: "posted", header: "Posted", render: (r) => <span className="text-xs text-muted-foreground">{formatDateTime(r.posted_at)}</span> },
    { key: "scraped", header: "Scraped", render: (r) => <span className="text-xs text-muted-foreground">{formatDateTime(r.scraped_at)}</span> },
    { key: "url", header: "", render: (r) => (
      <a href={r.source_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary"><ExternalLink className="h-4 w-4" /></a>
    )},
  ];

  return (
    <>
      <PageHeader title="Scraped Jobs" description="Latest 1000 jobs collected by the scraper pipeline." />
      <PageBody>
        <DataTable data={data} columns={columns} loading={isLoading} rowKey={(r) => r.id} searchKeys={["title", "company", "site", "location"]} />
      </PageBody>
    </>
  );
}

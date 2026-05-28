import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { formatDateTime, truncate } from "@/components/admin/format";

export const Route = createFileRoute("/dashboard/errors")({
  head: () => ({ meta: [{ title: "Errors — Admin" }] }),
  component: ErrorsPage,
});

type E = {
  id: string; user_id: string | null; error_message: string; error_stack: string | null;
  section: string | null; action_context: string | null; user_description: string | null; created_at: string;
};

function ErrorsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "errors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("error_reports")
        .select("id,user_id,error_message,error_stack,section,action_context,user_description,created_at")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data as E[];
    },
  });

  const columns: Column<E>[] = [
    { key: "msg", header: "Error", render: (r) => (
      <div>
        <div className="font-medium text-destructive">{truncate(r.error_message, 100)}</div>
        {r.user_description && <div className="mt-0.5 text-xs text-muted-foreground">"{truncate(r.user_description, 80)}"</div>}
      </div>
    )},
    { key: "section", header: "Section", render: (r) => <span className="rounded bg-muted px-2 py-1 text-xs">{r.section || "unknown"}</span> },
    { key: "ctx", header: "Context", render: (r) => <span className="text-xs text-muted-foreground">{truncate(r.action_context, 40)}</span> },
    { key: "created", header: "When", render: (r) => <span className="text-xs text-muted-foreground">{formatDateTime(r.created_at)}</span> },
  ];

  return (
    <>
      <PageHeader title="Error Reports" description="Client-side errors captured from users." />
      <PageBody>
        <DataTable data={data} columns={columns} loading={isLoading} rowKey={(r) => r.id} searchKeys={["error_message", "section", "user_description"]} />
      </PageBody>
    </>
  );
}

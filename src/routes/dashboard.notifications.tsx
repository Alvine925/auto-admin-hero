import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { formatDateTime, truncate } from "@/components/admin/format";
import { UserLink } from "@/components/admin/UserLink";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Admin" }] }),
  component: NotificationsPage,
});

type N = {
  id: string; user_id: string; type: string; title: string; message: string;
  read: boolean; created_at: string;
};

function NotificationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("id,user_id,type,title,message,read,created_at")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data as N[];
    },
  });

  const columns: Column<N>[] = [
    { key: "type", header: "Type", render: (r) => <span className="rounded bg-muted px-2 py-1 text-xs font-medium">{r.type}</span> },
    { key: "title", header: "Title", render: (r) => <div className="font-medium">{r.title}</div> },
    { key: "message", header: "Message", render: (r) => <span className="text-sm text-muted-foreground">{truncate(r.message, 80)}</span> },
    { key: "read", header: "Read", render: (r) => r.read ? <span className="text-xs text-success">✓ read</span> : <span className="text-xs text-warning">unread</span> },
    { key: "created", header: "When", render: (r) => <span className="text-xs text-muted-foreground">{formatDateTime(r.created_at)}</span> },
  ];

  return (
    <>
      <PageHeader title="Notifications" description="All in-app notifications sent across the platform." />
      <PageBody>
        <DataTable data={data} columns={columns} loading={isLoading} rowKey={(r) => r.id} searchKeys={["title", "message", "type"]} />
      </PageBody>
    </>
  );
}

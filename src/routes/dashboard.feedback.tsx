import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { formatDateTime } from "@/components/admin/format";
import { Star } from "lucide-react";

export const Route = createFileRoute("/dashboard/feedback")({
  head: () => ({ meta: [{ title: "Feedback — Admin" }] }),
  component: FeedbackPage,
});

type F = { id: string; user_id: string | null; category: string; message: string; rating: number | null; created_at: string };

function FeedbackPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "feedback"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_feedback")
        .select("id,user_id,category,message,rating,created_at")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data as F[];
    },
  });

  const columns: Column<F>[] = [
    { key: "cat", header: "Category", render: (r) => <span className="rounded bg-muted px-2 py-1 text-xs font-medium capitalize">{r.category}</span> },
    { key: "rating", header: "Rating", render: (r) => r.rating ? (
      <div className="flex items-center gap-0.5 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-3.5 w-3.5 ${i < (r.rating ?? 0) ? "fill-gold" : "opacity-30"}`} />
        ))}
      </div>
    ) : <span className="text-muted-foreground">—</span> },
    { key: "message", header: "Message", render: (r) => <div className="max-w-xl text-sm text-foreground">{r.message}</div> },
    { key: "created", header: "When", render: (r) => <span className="text-xs text-muted-foreground">{formatDateTime(r.created_at)}</span> },
  ];

  return (
    <>
      <PageHeader title="User Feedback" description="What users are telling you about the product." />
      <PageBody>
        <DataTable data={data} columns={columns} loading={isLoading} rowKey={(r) => r.id} searchKeys={["message", "category"]} />
      </PageBody>
    </>
  );
}

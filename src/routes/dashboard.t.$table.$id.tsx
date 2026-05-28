import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/PageHeader";
import { TABLE_CONFIGS, TableKey } from "@/components/admin/table-config";
import { ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/t/$table/$id")({
  component: RowDetailPage,
});

function renderValue(v: unknown) {
  if (v === null || v === undefined) return <span className="text-muted-foreground">—</span>;
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "object") {
    return (
      <pre className="overflow-x-auto rounded bg-muted/40 p-2 text-[11px]">
        {JSON.stringify(v, null, 2)}
      </pre>
    );
  }
  const s = String(v);
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) {
    try { return new Date(s).toLocaleString(); } catch { /* */ }
  }
  if (s.startsWith("http")) {
    return <a href={s} target="_blank" rel="noreferrer" className="text-primary underline break-all">{s}</a>;
  }
  return <span className="whitespace-pre-wrap break-words">{s}</span>;
}

function RowDetailPage() {
  const { table, id } = Route.useParams();
  const navigate = useNavigate();
  const cfg = TABLE_CONFIGS[table as TableKey];

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-row", table, id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table as never)
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data as Record<string, unknown> | null;
    },
  });

  return (
    <div className="p-6 md:p-8">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/dashboard/t/$table", params: { table } })} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to {cfg?.label ?? table}
      </Button>

      <PageHeader title={`${cfg?.label ?? table} · Detail`} description={`Row id: ${id}`} />

      {isLoading && (
        <Card className="grid place-items-center p-12 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </Card>
      )}

      {error && (
        <Card className="p-6 text-sm text-destructive">{(error as Error).message}</Card>
      )}

      {!isLoading && !data && (
        <Card className="p-6 text-sm text-muted-foreground">No record found.</Card>
      )}

      {data && (
        <Card className="divide-y divide-border">
          {Object.entries(data).map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 gap-2 px-5 py-3 md:grid-cols-[200px_1fr]">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="text-sm">{renderValue(v)}</div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

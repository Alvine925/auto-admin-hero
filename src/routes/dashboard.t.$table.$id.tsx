import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { TABLE_CONFIGS, TableKey } from "@/components/admin/table-config";
import { ArrowLeft, Eye, Loader2 } from "lucide-react";

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

  // Log a view for this row
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (cancelled) return;
      await supabase.from("job_views").insert({
        job_id: id,
        table_name: table,
        user_id: auth.user?.id ?? null,
      });
    })();
    return () => { cancelled = true; };
  }, [id, table]);

  const { data: viewCount } = useQuery({
    queryKey: ["job-views-count", table, id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("job_views")
        .select("*", { count: "exact", head: true })
        .eq("table_name", table)
        .eq("job_id", id);
      if (error) throw error;
      return count ?? 0;
    },
    refetchInterval: 15000,
  });

  const title =
    (data?.title as string) ||
    (data?.name as string) ||
    (data?.full_name as string) ||
    (data?.email as string) ||
    `${cfg?.label ?? table} record`;

  const subtitle = [data?.company, data?.location].filter(Boolean).join(" · ");

  return (
    <div className="p-6 md:p-8">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/dashboard/t/$table", params: { table } })} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to {cfg?.label ?? table}
      </Button>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle as string}</p>}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card/40 px-4 py-2 text-sm">
          <Eye className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">{viewCount ?? 0}</span>
          <span className="text-muted-foreground">{(viewCount ?? 0) === 1 ? "view" : "views"}</span>
        </div>
      </div>

      {isLoading && (
        <div className="grid place-items-center p-12 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      )}

      {error && (
        <div className="p-6 text-sm text-destructive">{(error as Error).message}</div>
      )}

      {!isLoading && !data && (
        <div className="p-6 text-sm text-muted-foreground">No record found.</div>
      )}

      {data && (
        <div className="divide-y divide-border/60">
          {Object.entries(data).map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 gap-2 py-3 md:grid-cols-[200px_1fr]">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="text-sm">{renderValue(v)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

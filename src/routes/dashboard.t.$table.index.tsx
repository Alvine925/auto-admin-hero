import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/admin/PageHeader";
import { TABLE_CONFIGS, TableKey } from "@/components/admin/table-config";
import { Eye, Search, ArrowLeft, ExternalLink, Mail } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/dashboard/t/$table/")({
  component: TableListPage,
});
export const Route = createFileRoute("/dashboard/t/$table/")({
  component: TableListPage,
});

function formatCell(value: unknown, truncate?: number): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") {
    const isDate = /^\d{4}-\d{2}-\d{2}T/.test(value);
    if (isDate) {
      try { return new Date(value).toLocaleString(); } catch { /* */ }
    }
    return truncate && value.length > truncate ? value.slice(0, truncate) + "…" : value;
  }
  if (typeof value === "object") {
    const s = JSON.stringify(value);
    return truncate && s.length > truncate ? s.slice(0, truncate) + "…" : s;
  }
  return String(value);
}

function TableListPage() {
  const { table } = Route.useParams();
  const navigate = useNavigate();
  const cfg = TABLE_CONFIGS[table as TableKey];
  const [q, setQ] = useState("");

  if (!cfg) {
    return (
      <div className="p-8">
        <Button variant="ghost" onClick={() => navigate({ to: "/dashboard" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">Unknown table: {table}</p>
      </div>
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ["admin-table", cfg.key],
    queryFn: async () => {
      let query = supabase.from(cfg.key as never).select("*").limit(500);
      if (cfg.orderBy) {
        query = query.order(cfg.orderBy.column, { ascending: cfg.orderBy.ascending ?? false });
      }
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Record<string, unknown>[];
    },
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!q || !cfg.searchKeys?.length) return data;
    const s = q.toLowerCase();
    return data.filter((row) =>
      cfg.searchKeys!.some((k) => String(row[k] ?? "").toLowerCase().includes(s))
    );
  }, [data, q, cfg.searchKeys]);

  return (
    <div className="p-6 md:p-8">
      <PageHeader title={cfg.label} description={`${cfg.group} · ${data?.length ?? 0} rows`} />

      <Card className="overflow-hidden">
        {cfg.searchKeys && (
          <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="h-8 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <span className="text-xs text-muted-foreground">
              {filtered.length} of {data?.length ?? 0}
            </span>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-left text-xs uppercase tracking-wider text-muted-foreground">
                {cfg.columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-medium">{c.header}</th>
                ))}
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={cfg.columns.length + 1} className="px-4 py-12 text-center text-muted-foreground">Loading…</td></tr>
              )}
              {!isLoading && filtered.length === 0 && (
                <tr><td colSpan={cfg.columns.length + 1} className="px-4 py-12 text-center text-muted-foreground">No records found.</td></tr>
              )}
              {!isLoading && filtered.map((row) => {
                const id = String(row.id ?? "");
                return (
                  <tr key={id} className="border-b border-border/60 transition-colors hover:bg-muted/30">
                    {cfg.columns.map((c) => (
                      <td key={c.key} className="px-4 py-3 align-middle">{formatCell(row[c.key], c.truncate)}</td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/dashboard/t/$table/$id" params={{ table, id }}>
                          <Eye className="mr-1 h-3.5 w-3.5" /> View
                        </Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

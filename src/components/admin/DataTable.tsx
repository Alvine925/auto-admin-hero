import { ReactNode, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[] | undefined;
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  loading?: boolean;
  emptyText?: string;
  rowKey: (row: T) => string;
}

export function DataTable<T>({ data, columns, searchKeys, loading, emptyText = "No records found.", rowKey }: DataTableProps<T>) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!q || !searchKeys?.length) return data;
    const s = q.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) => String((row as Record<string, unknown>)[k as string] ?? "").toLowerCase().includes(s))
    );
  }, [data, q, searchKeys]);

  return (
    <Card className="overflow-hidden">
      {searchKeys && (
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
              {columns.map((c) => (
                <th key={c.key} className={`px-4 py-3 font-medium ${c.className ?? ""}`}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">{emptyText}</td></tr>
            )}
            {!loading && filtered.map((row) => (
              <tr key={rowKey(row)} className="border-b border-border/60 transition-colors hover:bg-muted/30">
                {columns.map((c) => (
                  <td key={c.key} className={`px-4 py-3 align-middle ${c.className ?? ""}`}>{c.render(row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

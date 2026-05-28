import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/admin/PageHeader";
import { Input } from "@/components/ui/input";
import { Loader2, FileText, ChevronRight, Search } from "lucide-react";

export const Route = createFileRoute("/dashboard/documents/")({
  component: DocumentsIndex,
});

type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  cv_url: string | null;
  cv_storage_path: string | null;
};

function DocumentsIndex() {
  const [q, setQ] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["documents-users"],
    queryFn: async () => {
      const [{ data: profiles }, { data: apps }] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, full_name, email, cv_url, cv_storage_path")
          .order("updated_at", { ascending: false })
          .limit(500),
        supabase.from("applications").select("user_id, cover_letter, email_body, interview_report, drive_url"),
      ]);

      const counts = new Map<string, { docs: number; hasCv: boolean }>();
      (apps ?? []).forEach((a: Record<string, unknown>) => {
        const uid = a.user_id as string;
        const entry = counts.get(uid) ?? { docs: 0, hasCv: false };
        if (a.cover_letter) entry.docs += 1;
        if (a.email_body) entry.docs += 1;
        if (a.interview_report) entry.docs += 1;
        if (a.drive_url) entry.docs += 1;
        counts.set(uid, entry);
      });

      return (profiles ?? []).map((p) => ({
        ...(p as ProfileRow),
        docCount: counts.get((p as ProfileRow).id)?.docs ?? 0,
      }));
    },
  });

  const filtered = (data ?? []).filter((u) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return (u.full_name ?? "").toLowerCase().includes(s) || (u.email ?? "").toLowerCase().includes(s);
  });

  return (
    <div className="p-6 md:p-8">
      <PageHeader title="User Documents" description="Browse uploaded CVs and AI-generated documents per user." />

      <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-card/40 px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or email"
          className="h-8 border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      {isLoading ? (
        <div className="grid place-items-center p-12 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <div className="divide-y divide-border/60 rounded-lg border border-border bg-card/30">
          {filtered.map((u) => (
            <Link
              key={u.id}
              to="/dashboard/documents/$userId"
              params={{ userId: u.id }}
              className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-muted/40"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">
                  {u.full_name || u.email || u.id}
                </div>
                <div className="truncate text-xs text-muted-foreground">{u.email}</div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className={u.cv_url || u.cv_storage_path ? "text-primary" : ""}>
                  <FileText className="mr-1 inline h-3 w-3" />
                  {u.cv_url || u.cv_storage_path ? "CV" : "No CV"}
                </span>
                <span>{u.docCount} generated</span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">No users found.</div>
          )}
        </div>
      )}
    </div>
  );
}

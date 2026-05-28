import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink, FileText, Loader2, Link2, Mail } from "lucide-react";

export const Route = createFileRoute("/dashboard/documents/$userId")({
  component: UserDocumentsPage,
});

function UserDocumentsPage() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["user-docs", userId],
    queryFn: async () => {
      const [{ data: profile }, { data: apps }, { data: templates }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
        supabase
          .from("applications")
          .select("id, job_title, company, status, created_at, cover_letter, email_subject, email_body, interview_report, interview_questions, pack_questions, pack_answers, drive_url, drive_folder_id")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }),
        supabase.from("templates").select("id, name, type, content, created_at").eq("user_id", userId),
      ]);

      let cvSignedUrl: string | null = null;
      const path = (profile as Record<string, unknown> | null)?.cv_storage_path as string | undefined;
      if (path) {
        const { data: signed } = await supabase.storage.from("cvs").createSignedUrl(path, 3600);
        cvSignedUrl = signed?.signedUrl ?? null;
      }

      return {
        profile: profile as Record<string, unknown> | null,
        apps: (apps ?? []) as Array<Record<string, unknown>>,
        templates: (templates ?? []) as Array<Record<string, unknown>>,
        cvSignedUrl,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="grid place-items-center p-12 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  const profile = data?.profile;
  const apps = data?.apps ?? [];
  const templates = data?.templates ?? [];
  const cvUrl = data?.cvSignedUrl || (profile?.cv_url as string | undefined);

  const displayName = (profile?.full_name as string) || (profile?.email as string) || userId;

  return (
    <div className="p-6 md:p-8">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/dashboard/documents" })} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to User Documents
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{displayName}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{profile?.email as string}</p>
      </div>

      <Section title="Uploaded CV">
        {cvUrl ? (
          <a
            href={cvUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-4 py-2 text-sm hover:bg-muted/40"
          >
            <FileText className="h-4 w-4 text-primary" />
            Open CV
            <Download className="ml-2 h-3 w-3 opacity-60" />
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">No CV uploaded.</p>
        )}
        {profile?.parsed_cv_text ? (
          <details className="mt-3 rounded-md border border-border/60 bg-card/20">
            <summary className="cursor-pointer px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
              Parsed CV text
            </summary>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap px-3 pb-3 text-xs">{profile.parsed_cv_text as string}</pre>
          </details>
        ) : null}
      </Section>

      <Section title={`Generated Application Documents (${apps.length})`}>
        {apps.length === 0 ? (
          <p className="text-sm text-muted-foreground">No applications yet.</p>
        ) : (
          <div className="divide-y divide-border/60 rounded-lg border border-border bg-card/20">
            {apps.map((a) => {
              const id = a.id as string;
              const open = openId === id;
              return (
                <div key={id} className="px-4 py-3">
                  <button
                    onClick={() => setOpenId(open ? null : id)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-foreground">
                        {(a.job_title as string) || "Untitled role"}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {(a.company as string) || "—"} ·{" "}
                        {a.created_at ? new Date(a.created_at as string).toLocaleDateString() : ""}
                      </div>
                    </div>
                    <DocBadges app={a} />
                  </button>

                  {open && (
                    <div className="mt-4 space-y-4 border-t border-border/40 pt-4">
                      {a.drive_url ? (
                        <a
                          href={a.drive_url as string}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" /> Open Google Drive folder
                        </a>
                      ) : null}
                      <DocBlock label="Cover Letter" text={a.cover_letter as string | null} />
                      <DocBlock
                        label={`Email${a.email_subject ? ` · ${a.email_subject}` : ""}`}
                        text={a.email_body as string | null}
                      />
                      <DocBlock label="Interview Questions" text={a.interview_questions as string | null} />
                      <DocBlock label="Interview Report" text={a.interview_report as string | null} />
                      <DocBlock label="Pack Questions" text={a.pack_questions as string | null} />
                      <DocBlock label="Pack Answers" text={a.pack_answers as string | null} />
                      <Link
                        to="/dashboard/t/$table/$id"
                        params={{ table: "applications", id }}
                        className="inline-block text-xs text-primary hover:underline"
                      >
                        View full application record →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Section>

      <Section title={`Templates (${templates.length})`}>
        {templates.length === 0 ? (
          <p className="text-sm text-muted-foreground">No saved templates.</p>
        ) : (
          <div className="divide-y divide-border/60 rounded-lg border border-border bg-card/20">
            {templates.map((t) => (
              <details key={t.id as string} className="px-4 py-3">
                <summary className="cursor-pointer text-sm font-medium text-foreground">
                  {(t.name as string) || "Template"}{" "}
                  <span className="ml-2 text-xs text-muted-foreground">{t.type as string}</span>
                </summary>
                <pre className="mt-2 max-h-80 overflow-auto whitespace-pre-wrap rounded bg-muted/30 p-3 text-xs">
                  {t.content as string}
                </pre>
              </details>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">{title}</h2>
      {children}
    </section>
  );
}

function DocBadges({ app }: { app: Record<string, unknown> }) {
  const items = [
    app.cover_letter && "Cover",
    app.email_body && "Email",
    app.interview_report && "Interview",
    app.drive_url && "Drive",
  ].filter(Boolean) as string[];
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((i) => (
        <span key={i} className="rounded bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
          {i}
        </span>
      ))}
    </div>
  );
}

function DocBlock({ label, text }: { label: string; text: string | null }) {
  if (!text) return null;
  return (
    <div>
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded border border-border/40 bg-muted/20 p-3 text-xs">
        {text}
      </pre>
    </div>
  );
}

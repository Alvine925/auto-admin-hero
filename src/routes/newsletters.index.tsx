import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Mail, Send } from "lucide-react";
import { NEWSLETTERS, NEWSLETTER_SENDER } from "@/lib/newsletters";

export const Route = createFileRoute("/newsletters/")({
  component: NewsletterOverview,
  head: () => ({
    meta: [
      { title: "Newsletter Dashboard | Tellus Jobs" },
      { name: "description", content: "Browse Tellus Jobs newsletter templates and send them to users individually or in batches." },
      { property: "og:title", content: "Newsletter Dashboard | Tellus Jobs" },
      { property: "og:description", content: "Browse newsletter templates and send them to users." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function NewsletterOverview() {
  const { data: recent } = useQuery({
    queryKey: ["newsletter-sends", "all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("newsletter_sends")
        .select("id, newsletter_id, newsletter_title, recipient_email, status, created_at")
        .order("created_at", { ascending: false })
        .limit(30);
      return data ?? [];
    },
  });

  const counts = (recent ?? []).reduce<Record<string, number>>((acc, r) => {
    const key = (r as Record<string, unknown>).newsletter_id as string;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Newsletter dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sent from {NEWSLETTER_SENDER} via Brevo — links point to myjobs.tellusjobs.site
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {NEWSLETTERS.map((n) => (
          <Link
            key={n.id}
            to="/newsletters/$id"
            params={{ id: n.id }}
            className="group rounded-lg border border-border p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
              <Mail className="h-3.5 w-3.5" /> {n.eyebrow}
            </div>
            <div className="mt-2 font-medium text-foreground">{n.title}</div>
            <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">{n.subject}</div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Send className="h-3.5 w-3.5" /> {counts[n.id] ?? 0} recent sends
            </div>
          </Link>
        ))}
      </div>

      <div>
        <div className="mb-2 text-sm font-medium text-foreground">Recent sends</div>
        <div className="divide-y divide-border rounded-md border border-border text-sm">
          {(recent ?? []).length === 0 && <div className="p-3 text-muted-foreground">Nothing sent yet.</div>}
          {(recent ?? []).map((r: Record<string, unknown>) => (
            <div key={r.id as string} className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="min-w-0">
                <div className="truncate text-foreground">{(r.recipient_email as string) ?? ""}</div>
                <div className="truncate text-xs text-muted-foreground">{(r.newsletter_title as string) ?? ""}</div>
              </div>
              <Badge variant={r.status === "sent" ? "secondary" : "destructive"}>{r.status as string}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

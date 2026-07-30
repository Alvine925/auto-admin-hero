import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Search, Send, Users } from "lucide-react";
import { toast } from "sonner";
import { renderNewsletterHtml, type Newsletter } from "@/lib/newsletters";
import { sendNewsletter } from "@/lib/newsletter.functions";

type Recipient = { id: string; email: string; name: string | null };

export function NewsletterComposer({ newsletter }: { newsletter: Newsletter }) {
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const send = useServerFn(sendNewsletter);

  const html = useMemo(() => renderNewsletterHtml(newsletter), [newsletter]);

  const { data: users, isLoading } = useQuery({
    queryKey: ["newsletter-recipients"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, email, full_name")
        .not("email", "is", null)
        .order("created_at", { ascending: false })
        .limit(2000);
      return (data ?? []).map((p) => ({
        id: p.id as string,
        email: p.email as string,
        name: (p.full_name as string | null) ?? null,
      })) as Recipient[];
    },
  });

  const { data: recent, refetch: refetchRecent } = useQuery({
    queryKey: ["newsletter-sends", newsletter.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("newsletter_sends")
        .select("id, newsletter_title, recipient_email, status, created_at")
        .eq("newsletter_id", newsletter.id)
        .order("created_at", { ascending: false })
        .limit(25);
      return data ?? [];
    },
  });

  const filtered = (users ?? []).filter((u) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return u.email.toLowerCase().includes(s) || (u.name ?? "").toLowerCase().includes(s);
  });

  const selected = (users ?? []).filter((u) => picked[u.id]);
  const allFilteredPicked = filtered.length > 0 && filtered.every((u) => picked[u.id]);

  const toggleAll = () => {
    setPicked((prev) => {
      const next = { ...prev };
      filtered.forEach((u) => {
        if (allFilteredPicked) delete next[u.id];
        else next[u.id] = true;
      });
      return next;
    });
  };

  const doSend = async (recipients: Recipient[]) => {
    if (!recipients.length) {
      toast.error("Select at least one recipient");
      return;
    }
    setSending(true);
    try {
      const res = await send({
        data: {
          newsletterId: newsletter.id,
          newsletterTitle: newsletter.title,
          subject: newsletter.subject,
          html,
          recipients: recipients.map((r) => ({ email: r.email, name: r.name, userId: r.id })),
        },
      });
      if (res.error) toast.error(res.error);
      else if (res.failed) toast.warning(`Sent ${res.sent}, failed ${res.failed}`);
      else toast.success(`Newsletter sent to ${res.sent} recipient${res.sent === 1 ? "" : "s"}`);
      refetchRecent();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to send newsletter");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{newsletter.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{newsletter.subject}</p>
        </div>
        <Button onClick={() => doSend(selected)} disabled={sending || selected.length === 0}>
          {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Send to {selected.length} selected
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Mail className="h-4 w-4 text-primary" /> Preview
          </div>
          <iframe
            title="Newsletter preview"
            srcDoc={html}
            className="h-[720px] w-full rounded-md border border-border bg-white"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Users className="h-4 w-4 text-primary" /> Recipients
              <Badge variant="secondary">{filtered.length}</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={toggleAll}>
                {allFilteredPicked ? "Clear" : "Select all"}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={sending || filtered.length === 0}
                onClick={() => doSend(filtered)}
              >
                Batch send ({filtered.length})
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name or email…"
              className="pl-9"
            />
          </div>

          <div className="max-h-[420px] divide-y divide-border overflow-y-auto rounded-md border border-border">
            {isLoading && (
              <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading users…
              </div>
            )}
            {!isLoading && filtered.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground">No users found.</div>
            )}
            {filtered.map((u) => (
              <div key={u.id} className="flex items-center gap-3 px-3 py-2">
                <Checkbox
                  checked={!!picked[u.id]}
                  onCheckedChange={(v) =>
                    setPicked((prev) => {
                      const next = { ...prev };
                      if (v) next[u.id] = true;
                      else delete next[u.id];
                      return next;
                    })
                  }
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-foreground">{u.name || "—"}</div>
                  <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={sending}
                  onClick={() => doSend([u])}
                  title="Send to this user"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-foreground">Recent sends</div>
            <div className="max-h-64 divide-y divide-border overflow-y-auto rounded-md border border-border text-sm">
              {(recent ?? []).length === 0 && (
                <div className="p-3 text-muted-foreground">Nothing sent yet.</div>
              )}
              {(recent ?? []).map((r: Record<string, unknown>) => (
                <div key={r.id as string} className="flex items-center justify-between gap-3 px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-foreground">{(r.recipient_email as string) ?? ""}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {(r.newsletter_title as string) ?? ""}
                    </div>
                  </div>
                  <Badge variant={r.status === "sent" ? "secondary" : "destructive"}>
                    {r.status as string}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

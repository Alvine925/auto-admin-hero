import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, Search, Send, UserCheck, Users } from "lucide-react";
import { toast } from "sonner";
import { renderNewsletterHtml, type Newsletter } from "@/lib/newsletters";
import {
  MAX_BULK_RECIPIENTS,
  MAX_NEWSLETTER_RECIPIENTS,
  parseBulkNewsletterRecipients,
} from "@/lib/newsletter-recipients";
import { sendNewsletter } from "@/lib/newsletter.functions";

type Recipient = { id: string; email: string; name: string | null };

export function NewsletterComposer({ newsletter }: { newsletter: Newsletter }) {
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [bulkRecipientsText, setBulkRecipientsText] = useState("");
  const [progress, setProgress] = useState<string | null>(null);
  const send = useServerFn(sendNewsletter);

  const html = useMemo(() => renderNewsletterHtml(newsletter), [newsletter]);
  const parsedBulkRecipients = useMemo(
    () => parseBulkNewsletterRecipients(bulkRecipientsText),
    [bulkRecipientsText],
  );

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

  const { data: tracking, refetch: refetchTracking } = useQuery({
    queryKey: ["newsletter-tracking", newsletter.id],
    queryFn: async () => {
      const { data: sends } = await supabase
        .from("newsletter_sends")
        .select("recipient_email, status, created_at")
        .eq("newsletter_id", newsletter.id)
        .eq("status", "sent")
        .order("created_at", { ascending: true })
        .limit(5000);
      const firstSent = new Map<string, string>();
      for (const r of sends ?? []) {
        const e = (r.recipient_email ?? "").toLowerCase();
        if (e && !firstSent.has(e)) firstSent.set(e, r.created_at as string);
      }
      const emails = [...firstSent.keys()];
      const profiles = new Map<string, { id: string; created_at: string }>();
      for (let i = 0; i < emails.length; i += 200) {
        const { data } = await supabase
          .from("profiles")
          .select("id, email, created_at")
          .in("email", emails.slice(i, i + 200));
        for (const p of data ?? [])
          profiles.set((p.email ?? "").toLowerCase(), { id: p.id, created_at: p.created_at });
      }
      const rows = emails.map((email) => {
        const p = profiles.get(email);
        const sentAt = firstSent.get(email)!;
        return {
          email,
          sentAt,
          userId: p?.id ?? null,
          status: !p
            ? ("not_signed_up" as const)
            : new Date(p.created_at) >= new Date(sentAt)
              ? ("signed_up" as const)
              : ("existing_user" as const),
        };
      });
      return rows;
    },
  });
  const signedUpCount = (tracking ?? []).filter((t) => t.status === "signed_up").length;

  const filtered = (users ?? []).filter((u) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return u.email.toLowerCase().includes(s) || (u.name ?? "").toLowerCase().includes(s);
  });

  const selected = (users ?? []).filter((u) => picked[u.id]);
  const allFilteredPicked = filtered.length > 0 && filtered.every((u) => picked[u.id]);

  const toggleAll = () => {
    const unpickedCount = filtered.filter((u) => !picked[u.id]).length;
    setPicked((prev) => {
      const next = { ...prev };
      if (allFilteredPicked) {
        filtered.forEach((u) => delete next[u.id]);
      } else {
        let remaining = MAX_NEWSLETTER_RECIPIENTS - Object.values(next).filter(Boolean).length;
        for (const user of filtered) {
          if (!next[user.id] && remaining > 0) {
            next[user.id] = true;
            remaining -= 1;
          }
        }
      }
      return next;
    });
    if (!allFilteredPicked && selected.length + unpickedCount > MAX_NEWSLETTER_RECIPIENTS) {
      toast.info(
        `Selected up to ${MAX_NEWSLETTER_RECIPIENTS}. Filter the list to choose different recipients.`,
      );
    }
  };

  const toggleUser = (userId: string, checked: boolean) => {
    if (checked && !picked[userId] && selected.length >= MAX_NEWSLETTER_RECIPIENTS) {
      toast.error(`A send is limited to ${MAX_NEWSLETTER_RECIPIENTS} recipients.`);
      return;
    }
    setPicked((prev) => {
      const next = { ...prev };
      if (checked) next[userId] = true;
      else delete next[userId];
      return next;
    });
  };

  const doSend = async (recipients: Recipient[]): Promise<boolean> => {
    if (!recipients.length) {
      toast.error("Select at least one recipient");
      return false;
    }
    if (recipients.length > MAX_BULK_RECIPIENTS) {
      toast.error(`A bulk send is limited to ${MAX_BULK_RECIPIENTS} recipients.`);
      return false;
    }
    setSending(true);
    let sent = 0;
    let failed = 0;
    try {
      for (let i = 0; i < recipients.length; i += MAX_NEWSLETTER_RECIPIENTS) {
        const batch = recipients.slice(i, i + MAX_NEWSLETTER_RECIPIENTS);
        if (recipients.length > MAX_NEWSLETTER_RECIPIENTS) {
          setProgress(`Sending ${i + 1}-${i + batch.length} of ${recipients.length}`);
        }
        const res = await send({
          data: {
            newsletterId: newsletter.id,
            newsletterTitle: newsletter.title,
            subject: newsletter.subject,
            html,
            recipients: batch.map((r) => ({ email: r.email, name: r.name, userId: r.id || null })),
          },
        });
        if (res.error) {
          toast.error(`${res.error}${sent ? ` (after ${sent} sent)` : ""}`);
          return false;
        }
        sent += res.sent ?? 0;
        failed += res.failed ?? 0;
      }
      if (failed) {
        toast.warning(`Sent ${sent}, failed ${failed}`);
        return false;
      }
      toast.success(`Newsletter sent to ${sent} recipient${sent === 1 ? "" : "s"}`);
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to send newsletter");
      return false;
    } finally {
      setSending(false);
      setProgress(null);
      refetchRecent();
      refetchTracking();
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {newsletter.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{newsletter.subject}</p>
        </div>
        <Button onClick={() => doSend(selected)} disabled={sending || selected.length === 0}>
          {sending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
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
                {allFilteredPicked ? "Clear" : `Select up to ${MAX_NEWSLETTER_RECIPIENTS}`}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={
                  sending || filtered.length === 0 || filtered.length > MAX_BULK_RECIPIENTS
                }
                onClick={() => doSend(filtered)}
              >
                Send to all ({filtered.length})
              </Button>
            </div>
          </div>
          {progress && (
            <p className="flex items-center gap-2 text-xs text-primary">
              <Loader2 className="h-3 w-3 animate-spin" /> {progress}
            </p>
          )}

          <form
            className="space-y-2 rounded-md border border-border p-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const email = customEmail.trim();
              const name = customName.trim();
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
                toast.error("Enter a valid email address");
                return;
              }
              await doSend([{ id: "", email, name: name.slice(0, 100) || null }]);
              setCustomEmail("");
              setCustomName("");
            }}
          >
            <div className="text-sm font-medium text-foreground">Send to someone new</div>
            <Input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Recipient name"
              maxLength={100}
            />
            <Input
              type="email"
              value={customEmail}
              onChange={(e) => setCustomEmail(e.target.value)}
              placeholder="recipient@email.com"
              maxLength={255}
              required
            />
            <Button type="submit" size="sm" className="w-full" disabled={sending}>
              {sending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Send email
            </Button>
          </form>

          <form
            className="space-y-2 rounded-md border border-border p-3"
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                parsedBulkRecipients.errors.length > 0 ||
                parsedBulkRecipients.recipients.length === 0
              ) {
                toast.error(
                  parsedBulkRecipients.errors[0] ?? "Add at least one name and email address.",
                );
                return;
              }
              const sent = await doSend(parsedBulkRecipients.recipients);
              if (sent) setBulkRecipientsText("");
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-medium text-foreground">Send to a list</div>
              <Badge
                variant={
                  parsedBulkRecipients.entryCount > MAX_BULK_RECIPIENTS
                    ? "destructive"
                    : "secondary"
                }
              >
                {parsedBulkRecipients.entryCount}/{MAX_BULK_RECIPIENTS}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Paste raw emails (any separator) or “name, email” per line. Emails are cleaned,
              de-duplicated and sorted; missing names become “There”.
            </p>
            <Textarea
              value={bulkRecipientsText}
              onChange={(e) => setBulkRecipientsText(e.target.value)}
              placeholder={"Amina Otieno, amina@example.com\nBrian Kimani, brian@example.com"}
              rows={7}
              maxLength={50000}
              aria-label="Bulk recipient names and email addresses"
            />
            {parsedBulkRecipients.recipients.length > 0 && (
              <div className="max-h-40 divide-y divide-border overflow-y-auto rounded border border-border text-xs">
                {parsedBulkRecipients.recipients.map((r) => (
                  <div key={r.email} className="flex justify-between gap-2 px-2 py-1">
                    <span className="truncate text-foreground">{r.email}</span>
                    <span className="shrink-0 text-muted-foreground">{r.name}</span>
                  </div>
                ))}
              </div>
            )}
            {parsedBulkRecipients.errors.length > 0 && (
              <ul className="space-y-1 text-xs text-destructive" role="alert">
                {parsedBulkRecipients.errors.slice(0, 4).map((error) => (
                  <li key={error}>{error}</li>
                ))}
                {parsedBulkRecipients.errors.length > 4 && (
                  <li>And {parsedBulkRecipients.errors.length - 4} more issues.</li>
                )}
              </ul>
            )}
            <Button
              type="submit"
              size="sm"
              className="w-full"
              disabled={
                sending ||
                parsedBulkRecipients.recipients.length === 0 ||
                parsedBulkRecipients.errors.length > 0
              }
            >
              {sending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Send to {parsedBulkRecipients.recipients.length} recipient
              {parsedBulkRecipients.recipients.length === 1 ? "" : "s"}
            </Button>
          </form>

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
                  disabled={
                    sending || (!picked[u.id] && selected.length >= MAX_NEWSLETTER_RECIPIENTS)
                  }
                  onCheckedChange={(v) => toggleUser(u.id, Boolean(v))}
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
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
              <span className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-primary" /> Signup tracking
              </span>
              <Badge variant="secondary">
                {signedUpCount} signed up / {(tracking ?? []).length} reached
              </Badge>
            </div>
            <div className="max-h-64 divide-y divide-border overflow-y-auto rounded-md border border-border text-sm">
              {(tracking ?? []).length === 0 && (
                <div className="p-3 text-muted-foreground">No recipients yet.</div>
              )}
              {(tracking ?? []).map((t) => (
                <div key={t.email} className="flex items-center justify-between gap-3 px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-foreground">{t.email}</div>
                    <div className="text-xs text-muted-foreground">
                      Sent {new Date(t.sentAt).toLocaleDateString()}
                    </div>
                  </div>
                  {t.status === "signed_up" ? (
                    <Badge>Signed up</Badge>
                  ) : t.status === "existing_user" ? (
                    <Badge variant="secondary">Already a user</Badge>
                  ) : (
                    <Badge variant="outline">Not yet</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-foreground">Recent sends</div>
            <div className="max-h-64 divide-y divide-border overflow-y-auto rounded-md border border-border text-sm">
              {(recent ?? []).length === 0 && (
                <div className="p-3 text-muted-foreground">Nothing sent yet.</div>
              )}
              {(recent ?? []).map((r: Record<string, unknown>) => (
                <div
                  key={r.id as string}
                  className="flex items-center justify-between gap-3 px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="truncate text-foreground">
                      {(r.recipient_email as string) ?? ""}
                    </div>
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

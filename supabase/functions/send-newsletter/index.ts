// Sends newsletter emails through the existing Brevo integration.
// Admin-only: caller JWT must map to a user with the `admin` role.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SENDER_EMAIL = "noreply@tellusjobs.site";
const SENDER_NAME = Deno.env.get("BREVO_SENDER_NAME") ?? "Tellus Jobs";

type Recipient = { email: string; name?: string | null; userId?: string | null };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader) {
      return json({ error: "Missing authorization" }, 401);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) return json({ error: "Unauthorized" }, 401);

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: isAdmin } = await admin.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (!isAdmin) return json({ error: "Forbidden" }, 403);

    const body = await req.json();
    const newsletterId = String(body.newsletterId ?? "").slice(0, 64);
    const newsletterTitle = String(body.newsletterTitle ?? "").slice(0, 200);
    const subject = String(body.subject ?? "").slice(0, 300);
    const html = String(body.html ?? "");
    const recipients: Recipient[] = Array.isArray(body.recipients) ? body.recipients : [];

    if (!subject || !html || recipients.length === 0) {
      return json({ error: "subject, html and recipients are required" }, 400);
    }
    if (recipients.length > 100) return json({ error: "A send is limited to 100 recipients" }, 400);

    const brevoKey = Deno.env.get("BREVO_API_KEY");
    if (!brevoKey) return json({ error: "BREVO_API_KEY is not configured" }, 500);

    const valid = recipients.filter((r) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email ?? ""));

    let sent = 0;
    const failures: { email: string; error: string }[] = [];
    const logRows: Record<string, unknown>[] = [];

    const chunkSize = 8;
    for (let i = 0; i < valid.length; i += chunkSize) {
      const chunk = valid.slice(i, i + chunkSize);
      await Promise.all(
        chunk.map(async (r) => {
          try {
            const res = await fetch("https://api.brevo.com/v3/smtp/email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                "api-key": brevoKey,
              },
              body: JSON.stringify({
                sender: { email: SENDER_EMAIL, name: SENDER_NAME },
                replyTo: { email: SENDER_EMAIL, name: SENDER_NAME },
                to: [{ email: r.email, name: r.name || undefined }],
                subject,
                htmlContent: personalize(html, r),
              }),
            });

            if (!res.ok) {
              const text = await res.text();
              failures.push({ email: r.email, error: `[${res.status}] ${text.slice(0, 300)}` });
              logRows.push({
                newsletter_id: newsletterId,
                newsletter_title: newsletterTitle,
                recipient_email: r.email,
                recipient_user_id: r.userId ?? null,
                status: "failed",
                error: `[${res.status}] ${text.slice(0, 500)}`,
                sent_by: userData.user.id,
              });
              return;
            }

            sent += 1;
            logRows.push({
              newsletter_id: newsletterId,
              newsletter_title: newsletterTitle,
              recipient_email: r.email,
              recipient_user_id: r.userId ?? null,
              status: "sent",
              sent_by: userData.user.id,
            });
          } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            failures.push({ email: r.email, error: msg });
            logRows.push({
              newsletter_id: newsletterId,
              newsletter_title: newsletterTitle,
              recipient_email: r.email,
              recipient_user_id: r.userId ?? null,
              status: "failed",
              error: msg.slice(0, 500),
              sent_by: userData.user.id,
            });
          }
        }),
      );
    }

    if (logRows.length) {
      await admin.from("newsletter_sends").insert(logRows);
    }

    return json({ sent, failed: failures.length, failures: failures.slice(0, 20) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("send-newsletter error", msg);
    return json({ error: msg }, 500);
  }
});

function personalize(html: string, r: Recipient) {
  const first = (r.name ?? "").trim().split(/\s+/)[0] || "there";
  return html.replaceAll("{{FIRST_NAME}}", escapeHtml(first));
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

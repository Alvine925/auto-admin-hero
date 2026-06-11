import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type JourneyEvent = {
  id: string;
  at: string;
  category:
    | "signup"
    | "auth"
    | "profile"
    | "cv"
    | "integration"
    | "job"
    | "application"
    | "workflow"
    | "ai"
    | "notification"
    | "feedback"
    | "error"
    | "referral"
    | "usage";
  type: string;
  title: string;
  description?: string | null;
  user_id: string;
  link?: { table: string; id: string } | null;
  metadata?: Record<string, unknown> | null;
};

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

function pushEvent(out: JourneyEvent[], e: JourneyEvent) {
  if (e.at) out.push(e);
}

async function collectEvents(opts: {
  admin: any;
  userId?: string;
  limitPerSource: number;
}): Promise<JourneyEvent[]> {
  const { admin, userId, limitPerSource } = opts;
  const scoped = <T,>(q: T) => (userId ? (q as any).eq("user_id", userId) : q);
  const scopedAs = <T,>(q: T, col: string) =>
    userId ? (q as any).eq(col, userId) : q;

  const events: JourneyEvent[] = [];

  // profiles (signup)
  {
    let q = admin.from("profiles").select("id,email,full_name,created_at,current_plan").order("created_at", { ascending: false }).limit(limitPerSource);
    if (userId) q = q.eq("id", userId);
    const { data } = await q;
    (data ?? []).forEach((p: any) => {
      pushEvent(events, {
        id: `profile-${p.id}`,
        at: p.created_at,
        category: "signup",
        type: "account_created",
        title: "Account created",
        description: p.full_name || p.email,
        user_id: p.id,
        link: { table: "profiles", id: p.id },
      });
    });
  }

  // usage_tracking (covers logins, cv_upload, pack_generation, etc.)
  {
    const { data } = await scoped(
      admin.from("usage_tracking").select("id,user_id,action_type,metadata,created_at").order("created_at", { ascending: false }).limit(limitPerSource),
    );
    (data ?? []).forEach((r: any) => {
      const action = String(r.action_type ?? "action");
      const isAuth = action.includes("login") || action.includes("signin") || action.includes("auth");
      const isCv = action.includes("cv");
      const cat: JourneyEvent["category"] = isAuth ? "auth" : isCv ? "cv" : "usage";
      pushEvent(events, {
        id: `usage-${r.id}`,
        at: r.created_at,
        category: cat,
        type: action,
        title: action.replaceAll("_", " "),
        user_id: r.user_id,
        metadata: r.metadata,
      });
    });
  }

  // login_attempts (failed/locked auth)
  if (!userId) {
    const { data } = await admin.from("login_attempts").select("id,email,attempts,locked_until,updated_at").order("updated_at", { ascending: false }).limit(limitPerSource);
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `login-${r.id}`,
        at: r.updated_at,
        category: "auth",
        type: "login_attempt",
        title: `Login attempts: ${r.attempts}`,
        description: r.email + (r.locked_until ? ` (locked until ${r.locked_until})` : ""),
        user_id: "",
      });
    });
  }

  // user_integrations updates
  {
    const { data } = await scoped(
      admin.from("user_integrations").select("id,user_id,google_connected,linkedin_time_filter,updated_at").order("updated_at", { ascending: false }).limit(limitPerSource),
    );
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `int-${r.id}`,
        at: r.updated_at,
        category: "integration",
        type: "integration_updated",
        title: r.google_connected ? "Google connected" : "Integration updated",
        description: `LinkedIn filter: ${r.linkedin_time_filter ?? "—"}`,
        user_id: r.user_id,
      });
    });
  }

  // jobs (saved)
  {
    const { data } = await scoped(
      admin.from("jobs").select("id,user_id,title,company,match_score,tracker_status,created_at").order("created_at", { ascending: false }).limit(limitPerSource),
    );
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `job-${r.id}`,
        at: r.created_at,
        category: "job",
        type: "job_saved",
        title: `Saved: ${r.title}`,
        description: `${r.company ?? ""} · score ${r.match_score ?? "—"} · ${r.tracker_status ?? ""}`,
        user_id: r.user_id,
        link: { table: "jobs", id: r.id },
      });
    });
  }

  // job_views
  {
    const { data } = await scoped(
      admin.from("job_views").select("id,user_id,job_id,viewed_at,created_at").order("viewed_at", { ascending: false }).limit(limitPerSource),
    );
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `view-${r.id}`,
        at: r.viewed_at ?? r.created_at,
        category: "job",
        type: "job_viewed",
        title: "Viewed job",
        description: r.job_id,
        user_id: r.user_id,
        link: r.job_id ? { table: "jobs", id: r.job_id } : null,
      });
    });
  }

  // applications
  {
    const { data } = await scoped(
      admin.from("applications").select("id,user_id,job_title,company,status,match_score,created_at").order("created_at", { ascending: false }).limit(limitPerSource),
    );
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `app-${r.id}`,
        at: r.created_at,
        category: "application",
        type: `application_${r.status ?? "created"}`,
        title: `Applied: ${r.job_title}`,
        description: `${r.company ?? ""} · ${r.status ?? ""}`,
        user_id: r.user_id,
        link: { table: "applications", id: r.id },
      });
    });
  }

  // workflows
  {
    const { data } = await scoped(
      admin.from("workflows").select("id,user_id,name,active,auto_apply,created_at").order("created_at", { ascending: false }).limit(limitPerSource),
    );
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `wf-${r.id}`,
        at: r.created_at,
        category: "workflow",
        type: "workflow_created",
        title: `Workflow: ${r.name}`,
        description: `${r.active ? "active" : "paused"} · auto-apply ${r.auto_apply ? "on" : "off"}`,
        user_id: r.user_id,
        link: { table: "workflows", id: r.id },
      });
    });
  }

  // job_coach_messages
  {
    const { data } = await scoped(
      admin.from("job_coach_messages").select("id,user_id,role,session_type,content,created_at").order("created_at", { ascending: false }).limit(limitPerSource),
    );
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `coach-${r.id}`,
        at: r.created_at,
        category: "ai",
        type: `coach_${r.role}`,
        title: `Coach ${r.role} (${r.session_type ?? "chat"})`,
        description: String(r.content ?? "").slice(0, 140),
        user_id: r.user_id,
      });
    });
  }

  // chat_messages
  {
    const { data } = await scopedAs(
      admin.from("chat_messages").select("id,user_id,role,content,created_at").order("created_at", { ascending: false }).limit(limitPerSource),
      "user_id",
    );
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `chat-${r.id}`,
        at: r.created_at,
        category: "ai",
        type: `chat_${r.role}`,
        title: `Chat ${r.role}`,
        description: String(r.content ?? "").slice(0, 140),
        user_id: r.user_id,
      });
    });
  }

  // notifications
  {
    const { data } = await scoped(
      admin.from("notifications").select("id,user_id,type,title,message,read,created_at").order("created_at", { ascending: false }).limit(limitPerSource),
    );
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `notif-${r.id}`,
        at: r.created_at,
        category: "notification",
        type: r.type ?? "notification",
        title: r.title ?? "Notification",
        description: `${r.read ? "read" : "unread"} · ${r.message ?? ""}`.slice(0, 200),
        user_id: r.user_id,
      });
    });
  }

  // user_feedback
  {
    const { data } = await scoped(
      admin.from("user_feedback").select("id,user_id,category,rating,message,created_at").order("created_at", { ascending: false }).limit(limitPerSource),
    );
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `fb-${r.id}`,
        at: r.created_at,
        category: "feedback",
        type: "feedback_submitted",
        title: `Feedback: ${r.category ?? ""} (${r.rating ?? "—"})`,
        description: String(r.message ?? "").slice(0, 200),
        user_id: r.user_id,
        link: { table: "user_feedback", id: r.id },
      });
    });
  }

  // error_reports
  {
    const { data } = await scoped(
      admin.from("error_reports").select("id,user_id,section,error_message,user_description,created_at").order("created_at", { ascending: false }).limit(limitPerSource),
    );
    (data ?? []).forEach((r: any) => {
      pushEvent(events, {
        id: `err-${r.id}`,
        at: r.created_at,
        category: "error",
        type: "error_reported",
        title: `Error in ${r.section ?? "app"}`,
        description: r.error_message ?? r.user_description ?? "",
        user_id: r.user_id,
        link: { table: "error_reports", id: r.id },
      });
    });
  }

  // referrals (as referrer OR referred)
  {
    let q = admin.from("referrals").select("id,referrer_user_id,referred_user_id,status,referral_code_used,created_at,verified_at").order("created_at", { ascending: false }).limit(limitPerSource);
    if (userId) q = q.or(`referrer_user_id.eq.${userId},referred_user_id.eq.${userId}`);
    const { data } = await q;
    (data ?? []).forEach((r: any) => {
      const isReferrer = !userId || r.referrer_user_id === userId;
      pushEvent(events, {
        id: `ref-${r.id}`,
        at: r.created_at,
        category: "referral",
        type: `referral_${r.status}`,
        title: isReferrer ? "Referred a user" : "Joined via referral",
        description: `code ${r.referral_code_used ?? "—"} · ${r.status}`,
        user_id: isReferrer ? r.referrer_user_id : r.referred_user_id,
        link: { table: "referrals", id: r.id },
      });
    });
  }

  events.sort((a, b) => (a.at < b.at ? 1 : -1));
  return events;
}

export const getUserJourney = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string; limitPerSource?: number }) => d)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id,email,full_name,current_plan,created_at,total_referrals,active_referrals,upgrade_expires_at")
      .eq("id", data.userId)
      .maybeSingle();

    const events = await collectEvents({
      admin: supabaseAdmin,
      userId: data.userId,
      limitPerSource: data.limitPerSource ?? 100,
    });
    return { profile, events };
  });

export const getGlobalActivity = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { limitPerSource?: number }) => d ?? {})
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const events = await collectEvents({
      admin: supabaseAdmin,
      limitPerSource: data?.limitPerSource ?? 40,
    });
    return { events: events.slice(0, 500) };
  });

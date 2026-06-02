// Fetches a user's CV from the private `cvs` storage bucket using the
// service role key. Caller must be authenticated; access is authorized
// via RLS check on the profiles table using the caller's JWT.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;

    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { userId } = await req.json().catch(() => ({}));
    if (!userId || typeof userId !== "string") {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Authorized client (as caller) — used to enforce RLS on profile read
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: profile, error: pErr } = await userClient
      .from("profiles")
      .select("cv_storage_path, cv_url")
      .eq("id", userId)
      .maybeSingle();

    if (pErr) {
      return new Response(JSON.stringify({ error: pErr.message }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!profile) {
      return new Response(JSON.stringify({ base64: null, contentType: null }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let path: string | null = profile.cv_storage_path ?? null;
    if (!path && profile.cv_url) {
      const marker = "/object/public/cvs/";
      const idx = profile.cv_url.indexOf(marker);
      if (idx >= 0) path = profile.cv_url.slice(idx + marker.length);
      else {
        const m2 = profile.cv_url.indexOf("/cvs/");
        if (m2 >= 0) path = profile.cv_url.slice(m2 + "/cvs/".length);
      }
    }
    if (!path) {
      return new Response(JSON.stringify({ base64: null, contentType: null }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Admin client to bypass storage RLS
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const candidates = Array.from(new Set([
      path,
      path.replace(/^\/+/, ""),
      `${userId}/${path.replace(/^\/+/, "")}`,
    ]));

    let file: Blob | null = null;
    let lastErr = "not found";
    for (const p of candidates) {
      const { data, error } = await admin.storage.from("cvs").download(p);
      if (!error && data) { file = data; break; }
      if (error) lastErr = error.message;
    }

    if (!file) {
      return new Response(JSON.stringify({ base64: null, contentType: null, error: lastErr }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const buf = new Uint8Array(await file.arrayBuffer());
    let binary = "";
    for (let i = 0; i < buf.length; i++) binary += String.fromCharCode(buf[i]);
    const base64 = btoa(binary);

    return new Response(
      JSON.stringify({ base64, contentType: file.type || "application/pdf" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

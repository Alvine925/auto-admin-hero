import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const fetchCvAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string }) => d)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    // RLS check: ensure the caller can read this profile
    const { data: profile, error: pErr } = await supabase
      .from("profiles")
      .select("cv_storage_path, cv_url")
      .eq("id", data.userId)
      .maybeSingle();
    if (pErr) throw new Error(pErr.message);
    const row = profile as { cv_storage_path?: string | null; cv_url?: string | null } | null;
    if (!row) return { base64: null, contentType: null };

    // Resolve a storage path from cv_storage_path or cv_url
    let path = row.cv_storage_path ?? null;
    if (!path && row.cv_url) {
      const marker = "/object/public/cvs/";
      const idx = row.cv_url.indexOf(marker);
      if (idx >= 0) path = row.cv_url.slice(idx + marker.length);
      else {
        const m2 = row.cv_url.indexOf("/cvs/");
        if (m2 >= 0) path = row.cv_url.slice(m2 + "/cvs/".length);
      }
    }
    if (!path) return { base64: null, contentType: null };

    // Try candidate paths (with/without userId prefix) using admin client to bypass storage RLS
    const candidates = Array.from(new Set([
      path,
      path.replace(/^\/+/, ""),
      `${data.userId}/${path.replace(/^\/+/, "")}`,
    ]));

    let file: Blob | null = null;
    let lastErr: string | null = null;
    for (const p of candidates) {
      const { data: f, error } = await supabaseAdmin.storage.from("cvs").download(p);
      if (!error && f) { file = f; break; }
      lastErr = error?.message ?? "not found";
    }
    if (!file) return { base64: null, contentType: null, error: lastErr };

    const buf = Buffer.from(await file.arrayBuffer());
    const contentType = file.type || "application/pdf";
    return { base64: buf.toString("base64"), contentType };
  });

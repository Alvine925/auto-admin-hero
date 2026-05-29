import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const fetchCvAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string }) => d)
  .handler(async ({ data }) => {
    const { data: profile, error: pErr } = await supabaseAdmin
      .from("profiles")
      .select("cv_storage_path, cv_url")
      .eq("id", data.userId)
      .maybeSingle();
    if (pErr) throw new Error(pErr.message);
    const path = (profile as { cv_storage_path?: string | null } | null)?.cv_storage_path;
    if (!path) return { base64: null, contentType: null };

    const { data: file, error } = await supabaseAdmin.storage.from("cvs").download(path);
    if (error || !file) throw new Error(error?.message || "Failed to download CV");

    const buf = Buffer.from(await file.arrayBuffer());
    const contentType = file.type || "application/pdf";
    return { base64: buf.toString("base64"), contentType };
  });

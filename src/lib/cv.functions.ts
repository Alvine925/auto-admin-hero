import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const fetchCvAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string }) => d)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { data: res, error } = await supabase.functions.invoke("fetch-cv", {
      body: { userId: data.userId },
    });
    if (error) return { base64: null, contentType: null, error: error.message };
    return res as { base64: string | null; contentType: string | null; error?: string };
  });

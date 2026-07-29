import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type SendNewsletterInput = {
  newsletterId: string;
  newsletterTitle: string;
  subject: string;
  html: string;
  recipients: { email: string; name?: string | null; userId?: string | null }[];
};

export type SendNewsletterResult = {
  sent: number;
  failed: number;
  failures?: { email: string; error: string }[];
  error?: string;
};

export const sendNewsletter = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: SendNewsletterInput) => d)
  .handler(async ({ data, context }): Promise<SendNewsletterResult> => {
    if (!data.recipients?.length) return { sent: 0, failed: 0, error: "No recipients selected" };

    const { data: res, error } = await context.supabase.functions.invoke("send-newsletter", {
      body: data,
    });

    if (error) return { sent: 0, failed: data.recipients.length, error: error.message };
    return res as SendNewsletterResult;
  });

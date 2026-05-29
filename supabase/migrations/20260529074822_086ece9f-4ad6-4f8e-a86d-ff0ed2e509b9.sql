
-- 1) Profiles: remove broad referrer read on full profile
DROP POLICY IF EXISTS "referrer can read referred user profiles" ON public.profiles;

-- 2) chat_messages: lock down (admin-only access)
DROP POLICY IF EXISTS "Anyone can delete messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can view messages" ON public.chat_messages;

CREATE POLICY "Admins read chat_messages"
  ON public.chat_messages FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins delete chat_messages"
  ON public.chat_messages FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

REVOKE INSERT, UPDATE, DELETE ON public.chat_messages FROM anon;
REVOKE ALL ON public.chat_messages FROM anon;

-- 3) user_integrations: prevent users from writing OAuth tokens/connection flags themselves
DROP POLICY IF EXISTS "own integrations all" ON public.user_integrations;

CREATE POLICY "own integrations select"
  ON public.user_integrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "own integrations insert"
  ON public.user_integrations FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND google_access_token IS NULL
    AND google_refresh_token IS NULL
    AND google_connected = false
  );

CREATE POLICY "own integrations update non-sensitive"
  ON public.user_integrations FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND google_access_token IS NOT DISTINCT FROM (
      SELECT google_access_token FROM public.user_integrations WHERE user_id = auth.uid()
    )
    AND google_refresh_token IS NOT DISTINCT FROM (
      SELECT google_refresh_token FROM public.user_integrations WHERE user_id = auth.uid()
    )
    AND google_connected IS NOT DISTINCT FROM (
      SELECT google_connected FROM public.user_integrations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "own integrations delete"
  ON public.user_integrations FOR DELETE
  USING (auth.uid() = user_id);

-- 4) Fix mutable search_path on handle_password_change
CREATE OR REPLACE FUNCTION public.handle_password_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF NEW.encrypted_password <> OLD.encrypted_password THEN
    DELETE FROM public.login_attempts WHERE email = NEW.email;
  END IF;
  RETURN NEW;
END;
$function$;

-- 5) Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated/public
-- Keep has_role executable (needed inside RLS policies evaluated as authenticated)
-- Keep claim_referral executable for authenticated users (RPC entry point)
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.process_completed_referral() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.track_user_usage(uuid, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_auth_user_update() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_referral_check() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.invoke_site_scraper_edge(text, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.invoke_new_site_scraper_edge(text, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_password_change() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.invoke_match_engine_edge() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.on_referral_completed_notify() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.on_application_status_notify() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.check_user_limits(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trigger_signup_emails() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trigger_referral_emails() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trigger_error_report_emails() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.invoke_process_scrapy_jobs_edge() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_admin_notification() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_oauth_sessions() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_referral_code() FROM PUBLIC, anon, authenticated;

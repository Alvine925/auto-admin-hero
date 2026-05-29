
-- Fix mutable search_path
CREATE OR REPLACE FUNCTION public.cleanup_expired_oauth_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  DELETE FROM public.pending_oauth_sessions
  WHERE used = true OR expires_at < now();
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $function$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER := 0;
BEGIN
  LOOP
    result := '';
    FOR i IN 1..6 LOOP
      result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE referral_code = result) THEN
      RETURN result;
    END IF;
  END LOOP;
END;
$function$;

-- Switch has_role to SECURITY INVOKER (user_roles SELECT policy allows self read)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY INVOKER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$function$;

-- Revoke execute on claim_referral (not used by client; admins can call via service_role)
REVOKE EXECUTE ON FUNCTION public.claim_referral(text) FROM PUBLIC, anon, authenticated;

-- Tighten error_reports insert (require user_id matches caller or be null/anon)
DROP POLICY IF EXISTS "Allow anonymous and authenticated insert" ON public.error_reports;
CREATE POLICY "Insert own error reports"
  ON public.error_reports FOR INSERT
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- Tighten job_views insert (require user_id matches caller or be null)
DROP POLICY IF EXISTS "Anyone authenticated can insert views" ON public.job_views;
CREATE POLICY "Insert own job views"
  ON public.job_views FOR INSERT
  TO authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

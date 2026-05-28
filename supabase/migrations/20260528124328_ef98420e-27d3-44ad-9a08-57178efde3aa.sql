
CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  row_id TEXT NOT NULL,
  summary TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admin_notifications_created_at_idx ON public.admin_notifications (created_at DESC);
CREATE INDEX IF NOT EXISTS admin_notifications_read_idx ON public.admin_notifications (read);

GRANT SELECT, UPDATE ON public.admin_notifications TO authenticated;
GRANT ALL ON public.admin_notifications TO service_role;

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read admin notifications"
ON public.admin_notifications FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update admin notifications"
ON public.admin_notifications FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Generic trigger function
CREATE OR REPLACE FUNCTION public.log_admin_notification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id TEXT;
  v_summary TEXT;
  v_row JSONB;
BEGIN
  v_row := to_jsonb(NEW);
  v_id := COALESCE(v_row->>'id', '');

  v_summary := COALESCE(
    v_row->>'title',
    v_row->>'name',
    v_row->>'email',
    v_row->>'full_name',
    v_row->>'message',
    v_row->>'error_message',
    v_row->>'action_type',
    v_row->>'type',
    TG_TABLE_NAME || ' row added'
  );

  INSERT INTO public.admin_notifications (table_name, row_id, summary)
  VALUES (TG_TABLE_NAME, v_id, left(v_summary, 200));

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$;

-- Attach trigger to each table
DO $$
DECLARE
  t TEXT;
  tables TEXT[] := ARRAY[
    'applications','chat_messages','error_reports','job_coach_messages',
    'job_listings','job_monitors','jobs','login_attempts','notifications',
    'profiles','referrals','scraped_jobs','scrapy_jobs','templates',
    'usage_tracking','user_feedback','user_integrations','user_roles','workflows'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_admin_notify ON public.%I', t);
    EXECUTE format(
      'CREATE TRIGGER trg_admin_notify AFTER INSERT ON public.%I FOR EACH ROW EXECUTE FUNCTION public.log_admin_notification()',
      t
    );
  END LOOP;
END $$;

ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_notifications;

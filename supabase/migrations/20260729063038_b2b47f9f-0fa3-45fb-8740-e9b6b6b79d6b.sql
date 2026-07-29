
CREATE TABLE IF NOT EXISTS public.newsletter_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  newsletter_id text NOT NULL,
  newsletter_title text,
  recipient_email text NOT NULL,
  recipient_user_id uuid,
  status text NOT NULL DEFAULT 'sent',
  error text,
  sent_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.newsletter_sends TO authenticated;
GRANT ALL ON public.newsletter_sends TO service_role;

ALTER TABLE public.newsletter_sends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view newsletter sends"
ON public.newsletter_sends
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS newsletter_sends_created_at_idx ON public.newsletter_sends (created_at DESC);

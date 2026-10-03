CREATE TABLE public.mailing_list (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text,
  source text NOT NULL DEFAULT 'newsletter',
  subscribed boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mailing_list TO authenticated;
GRANT ALL ON public.mailing_list TO service_role;
ALTER TABLE public.mailing_list ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage mailing list" ON public.mailing_list FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.add_newsletter_recipient_to_mailing_list()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status = 'sent' AND NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE lower(email) = lower(NEW.recipient_email)
  ) THEN
    INSERT INTO public.mailing_list (email) VALUES (lower(NEW.recipient_email))
    ON CONFLICT (email) DO NOTHING;
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER newsletter_sends_to_mailing_list AFTER INSERT ON public.newsletter_sends
FOR EACH ROW EXECUTE FUNCTION public.add_newsletter_recipient_to_mailing_list();

INSERT INTO public.mailing_list (email)
SELECT DISTINCT lower(s.recipient_email) FROM public.newsletter_sends s
WHERE s.status = 'sent' AND NOT EXISTS (SELECT 1 FROM public.profiles p WHERE lower(p.email) = lower(s.recipient_email))
ON CONFLICT (email) DO NOTHING;
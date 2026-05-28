
CREATE TABLE IF NOT EXISTS public.job_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL,
  table_name text NOT NULL,
  user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_job_views_job ON public.job_views(table_name, job_id);

GRANT SELECT, INSERT ON public.job_views TO authenticated;
GRANT SELECT ON public.job_views TO anon;
GRANT ALL ON public.job_views TO service_role;

ALTER TABLE public.job_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can insert views"
ON public.job_views FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Anyone authenticated can read views"
ON public.job_views FOR SELECT TO authenticated
USING (true);

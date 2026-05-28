-- Admin role infrastructure
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin SELECT policies across all tables so the admin dashboard can read everything
CREATE POLICY "Admins read all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all jobs" ON public.jobs
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all applications" ON public.applications
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all workflows" ON public.workflows
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all job_monitors" ON public.job_monitors
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all templates" ON public.templates
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all notifications" ON public.notifications
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all referrals" ON public.referrals
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all usage_tracking" ON public.usage_tracking
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all user_feedback" ON public.user_feedback
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all error_reports" ON public.error_reports
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all user_integrations" ON public.user_integrations
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all job_coach_messages" ON public.job_coach_messages
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all login_attempts" ON public.login_attempts
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read all scrapy_jobs" ON public.scrapy_jobs
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

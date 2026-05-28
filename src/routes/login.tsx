import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Admin" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate({ to: "/dashboard" });
  }, [loading, user, isAdmin, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) toast.error(error);
    else toast.success("Signed in. Checking admin access…");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-sidebar text-sidebar-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--gold)/15%,_transparent_60%)]" />
      <div className="relative grid min-h-screen place-items-center px-4">
        <Card className="w-full max-w-md border-sidebar-border/40 bg-card p-8 shadow-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Crown className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Admin Console</h1>
              <p className="text-xs text-muted-foreground">Restricted access</p>
            </div>
          </div>

          {user && !isAdmin && !loading && (
            <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              Signed in as <strong>{user.email}</strong> but this account has no admin role.
              Ask an existing admin (or run SQL in Supabase) to grant access:
              <pre className="mt-2 overflow-x-auto rounded bg-muted/40 p-2 text-[11px] text-foreground/80">{`insert into user_roles (user_id, role) values ('${user.id}', 'admin');`}</pre>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Use any existing user account from your Supabase project. Admin role required to enter the dashboard.
          </p>
        </Card>
      </div>
    </div>
  );
}

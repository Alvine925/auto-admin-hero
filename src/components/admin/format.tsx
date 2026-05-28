import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  sent: "bg-success/15 text-success border-success/30",
  completed: "bg-success/15 text-success border-success/30",
  verified: "bg-success/15 text-success border-success/30",
  pending: "bg-warning/20 text-warning-foreground border-warning/40",
  draft: "bg-muted text-muted-foreground border-border",
  failed: "bg-destructive/15 text-destructive border-destructive/30",
  error: "bg-destructive/15 text-destructive border-destructive/30",
  active: "bg-primary/10 text-primary border-primary/30",
  upgraded: "bg-gold/15 text-gold border-gold/40",
  free: "bg-muted text-muted-foreground border-border",
  admin: "bg-gold/15 text-gold border-gold/40",
  moderator: "bg-primary/10 text-primary border-primary/30",
  user: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ value }: { value: string | null | undefined }) {
  if (!value) return <span className="text-muted-foreground">—</span>;
  const tone = tones[value.toLowerCase()] ?? "bg-muted text-muted-foreground border-border";
  return (
    <Badge variant="outline" className={cn("capitalize", tone)}>
      {value}
    </Badge>
  );
}

export function formatDate(d: string | null | undefined) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function formatDateTime(d: string | null | undefined) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function truncate(s: string | null | undefined, n = 60) {
  if (!s) return "—";
  return s.length > n ? s.slice(0, n) + "…" : s;
}

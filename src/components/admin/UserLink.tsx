import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User as UserIcon } from "lucide-react";

export type ProfileLite = { id: string; full_name: string | null; email: string | null };

export function useProfilesMap() {
  return useQuery({
    queryKey: ["admin", "profiles-map"],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .limit(5000);
      if (error) throw error;
      const map = new Map<string, ProfileLite>();
      (data ?? []).forEach((p) => map.set(p.id as string, p as ProfileLite));
      return map;
    },
  });
}

export function UserLink({
  userId,
  className,
  showIcon = true,
}: {
  userId: string | null | undefined;
  className?: string;
  showIcon?: boolean;
}) {
  const { data: map } = useProfilesMap();
  if (!userId) return <span className="text-muted-foreground">—</span>;
  const p = map?.get(userId);
  const label = p?.full_name || p?.email || `${userId.slice(0, 8)}…`;
  return (
    <Link
      to="/dashboard/documents/$userId"
      params={{ userId }}
      className={
        className ??
        "inline-flex items-center gap-1 text-xs text-primary hover:underline"
      }
      title={p?.email || userId}
    >
      {showIcon ? <UserIcon className="h-3 w-3" /> : null}
      <span className="truncate max-w-[180px]">{label}</span>
    </Link>
  );
}

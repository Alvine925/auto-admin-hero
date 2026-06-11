import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getGlobalActivity, type JourneyEvent } from "@/lib/journey.functions";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfilesMap } from "@/components/admin/UserLink";
import { Loader2, ExternalLink, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/activity")({
  head: () => ({ meta: [{ title: "Live Activity — Admin" }] }),
  component: ActivityPage,
});

function ActivityPage() {
  const navigate = useNavigate();
  const fetchActivity = useServerFn(getGlobalActivity);
  const { data, isLoading, error } = useQuery({
    queryKey: ["global-activity"],
    queryFn: () => fetchActivity({ data: { limitPerSource: 40 } }),
    refetchInterval: 30_000,
  });

  return (
    <>
      <PageHeader
        title="Live Activity"
        description="A firehose of recent events across every user (auto-refreshes every 30s)."
      />
      <PageBody>
        <Card className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 p-10 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading activity…
            </div>
          ) : error ? (
            <div className="p-6 text-sm text-destructive">Failed: {(error as Error).message}</div>
          ) : (
            <div className="divide-y divide-border">
              {(data?.events ?? []).slice(0, 300).map((e: JourneyEvent) => (
                <div key={e.id} className="grid grid-cols-[110px_1fr_180px] gap-3 px-4 py-2 text-sm hover:bg-muted/40">
                  <Badge variant="secondary" className="self-start text-[10px] uppercase">{e.category}</Badge>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium truncate">{e.title}</span>
                      {e.link && (
                        <button
                          onClick={() => navigate({ to: "/dashboard/t/$table/$id", params: { table: e.link!.table, id: e.link!.id } })}
                          className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {e.link.table}
                        </button>
                      )}
                    </div>
                    {e.description && <p className="text-xs text-muted-foreground line-clamp-1">{e.description}</p>}
                  </div>
                  <div className="flex items-center justify-end gap-3 text-[11px] text-muted-foreground tabular-nums">
                    {e.user_id ? (
                      <button
                        onClick={() => navigate({ to: "/dashboard/journey/$userId", params: { userId: e.user_id } })}
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                        title="Open user journey"
                      >
                        <UserIcon className="h-3 w-3" />
                        <UserLinkInline userId={e.user_id} />
                      </button>
                    ) : <span>—</span>}
                    <span>{new Date(e.at).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
              {(data?.events ?? []).length === 0 && (
                <div className="p-10 text-center text-sm text-muted-foreground">No recent activity.</div>
              )}
            </div>
          )}
        </Card>
      </PageBody>
    </>
  );
}

function UserLinkInline({ userId }: { userId: string }) {
  const { data: map } = useProfilesMap();
  const p = map?.get(userId);
  const label = p?.full_name || p?.email || `${userId.slice(0, 8)}…`;
  return <span className="truncate max-w-[140px]">{label}</span>;
}

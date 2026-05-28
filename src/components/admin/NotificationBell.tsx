import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface AdminNotification {
  id: string;
  table_name: string;
  row_id: string;
  summary: string | null;
  read: boolean;
  created_at: string;
}

export function NotificationBell() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["admin-notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(30);
      if (error) throw error;
      return (data ?? []) as AdminNotification[];
    },
    refetchInterval: 30000,
  });

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("admin-notifications-stream")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "admin_notifications" },
        () => {
          qc.invalidateQueries({ queryKey: ["admin-notifications"] });
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [qc]);

  const unread = (data ?? []).filter((n) => !n.read).length;

  const markRead = async (n: AdminNotification) => {
    if (!n.read) {
      await supabase.from("admin_notifications").update({ read: true }).eq("id", n.id);
      qc.invalidateQueries({ queryKey: ["admin-notifications"] });
    }
  };

  const markAllRead = async () => {
    await supabase.from("admin_notifications").update({ read: true }).eq("read", false);
    qc.invalidateQueries({ queryKey: ["admin-notifications"] });
  };

  const openNotification = async (n: AdminNotification) => {
    await markRead(n);
    setOpen(false);
    if (n.row_id) {
      navigate({ to: "/dashboard/t/$table/$id", params: { table: n.table_name, id: n.row_id } });
    } else {
      navigate({ to: "/dashboard/t/$table", params: { table: n.table_name } });
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-sidebar">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <div className="text-sm font-semibold">Notifications</div>
            <div className="text-[11px] text-muted-foreground">{unread} unread</div>
          </div>
          {unread > 0 && (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={markAllRead}>
              <Check className="mr-1 h-3 w-3" /> Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-[420px] overflow-y-auto">
          {(!data || data.length === 0) && (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              No notifications yet.
            </div>
          )}
          {data?.map((n) => (
            <button
              key={n.id}
              onClick={() => openNotification(n)}
              className={cn(
                "block w-full border-b border-border/60 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                !n.read && "bg-muted/30"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {n.table_name}
                    </span>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                  </div>
                  <div className="mt-1 truncate text-sm">{n.summary ?? "—"}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    {new Date(n.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

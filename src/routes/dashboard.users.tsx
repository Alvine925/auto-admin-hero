import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, PageBody } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge, formatDate, formatDateTime } from "@/components/admin/format";

export const Route = createFileRoute("/dashboard/users")({
  head: () => ({ meta: [{ title: "Users — Admin" }] }),
  component: UsersPage,
});

type Profile = {
  id: string; full_name: string | null; email: string | null; phone: string | null;
  current_plan: string; onboarding_completed: boolean; total_referrals: number | null;
  active_referrals: number | null; created_at: string; cv_parsed_at: string | null;
  experience_level: string | null; preferred_county: string | null;
};

function UsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id,full_name,email,phone,current_plan,onboarding_completed,total_referrals,active_referrals,created_at,cv_parsed_at,experience_level,preferred_county")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data as Profile[];
    },
  });

  const columns: Column<Profile>[] = [
    { key: "name", header: "User", render: (r) => (
      <div>
        <div className="font-medium text-foreground">{r.full_name || "—"}</div>
        <div className="text-xs text-muted-foreground">{r.email}</div>
      </div>
    )},
    { key: "plan", header: "Plan", render: (r) => <StatusBadge value={r.current_plan} /> },
    { key: "exp", header: "Experience", render: (r) => <span className="text-muted-foreground">{r.experience_level || "—"}</span> },
    { key: "county", header: "County", render: (r) => <span className="text-muted-foreground">{r.preferred_county || "—"}</span> },
    { key: "refs", header: "Referrals", render: (r) => (
      <span className="tabular-nums">{r.active_referrals ?? 0}<span className="text-muted-foreground"> / {r.total_referrals ?? 0}</span></span>
    )},
    { key: "cv", header: "CV", render: (r) => <span className="text-xs text-muted-foreground">{formatDate(r.cv_parsed_at)}</span> },
    { key: "onb", header: "Onboarded", render: (r) => <StatusBadge value={r.onboarding_completed ? "completed" : "pending"} /> },
    { key: "created", header: "Joined", render: (r) => <span className="text-xs text-muted-foreground">{formatDateTime(r.created_at)}</span> },
  ];

  return (
    <>
      <PageHeader title="Users" description={`${data?.length ?? 0} profiles in the platform.`} />
      <PageBody>
        <DataTable
          data={data}
          columns={columns}
          loading={isLoading}
          rowKey={(r) => r.id}
          searchKeys={["full_name", "email", "phone", "preferred_county"]}
        />
      </PageBody>
    </>
  );
}

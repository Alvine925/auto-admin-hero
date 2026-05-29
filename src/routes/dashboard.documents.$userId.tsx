import { createFileRoute } from "@tanstack/react-router";
import { UserDocumentsView } from "@/components/admin/UserDocumentsView";

export const Route = createFileRoute("/dashboard/documents/$userId")({
  component: UserDocumentsPage,
});

function UserDocumentsPage() {
  const { userId } = Route.useParams();
  return <UserDocumentsView userId={userId} />;
}

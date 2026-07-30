import { createFileRoute, Link } from "@tanstack/react-router";
import { getNewsletter } from "@/lib/newsletters";
import { NewsletterComposer } from "@/components/newsletter/NewsletterComposer";

export const Route = createFileRoute("/newsletters/$id")({
  component: NewsletterDetail,
  head: () => ({
    meta: [
      { title: "Newsletter template | Tellus Jobs" },
      { name: "description", content: "Preview a Tellus Jobs newsletter template and send it to selected users." },
      { property: "og:title", content: "Newsletter template | Tellus Jobs" },
      { property: "og:description", content: "Preview and send a Tellus Jobs newsletter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function NewsletterDetail() {
  const { id } = Route.useParams();
  const newsletter = getNewsletter(id);

  if (!newsletter) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Newsletter not found.{" "}
        <Link to="/newsletters" className="text-primary underline">
          Back to overview
        </Link>
      </div>
    );
  }

  return <NewsletterComposer newsletter={newsletter} />;
}

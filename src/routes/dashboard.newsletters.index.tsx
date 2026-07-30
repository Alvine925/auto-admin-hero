import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/newsletters/")({
  beforeLoad: () => {
    throw redirect({ to: "/newsletters" });
  },
});

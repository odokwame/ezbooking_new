import { createFileRoute } from "@tanstack/react-router";
import Registration from "../components/Registration";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Registration />;
}

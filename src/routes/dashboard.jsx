import { Outlet, createFileRoute } from "@tanstack/react-router";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import NotFound from "../components/NotFound";

export const Route = createFileRoute("/dashboard")({
  component: DashboardRoot,
  notFoundComponent: NotFound,
});

function DashboardRoot() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

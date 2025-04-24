import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../contexts/AuthContext";
import UserDashboard from "../../components/dashboards/UserDashboard";
import AdminDashboard from "../../components/dashboards/AdminDashboard";
import ManagerDashboard from "../../components/dashboards/ManagerDashboard";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "manager":
      return <ManagerDashboard />;
    case "user":
      return <UserDashboard />;
    default:
      return <div className="text-red-500">Unauthorized</div>;
  }
}

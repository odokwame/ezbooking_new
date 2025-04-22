import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import UserDashboard from "../../components/dashboards/UserDashboard";
import AdminDashboard from "../../components/dashboards/AdminDashboard";
import ManagerDashboard from "../../components/dashboards/ManagerDashboard";

export const Route = createFileRoute("/dashboard/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [userRole, setUserRole] = useState("manager");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await api.getCurrentUser();
        setUserRole(user.role);
      } catch (error) {
        navigate({ to: "/login" });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const renderDashboard = () => {
    switch (userRole) {
      case "admin":
        return <AdminDashboard />;
      case "manager":
        console.log("Manager dashboard");
        return <ManagerDashboard />;
      case "user":
        return <UserDashboard />;
      default:
        return (
          <div className="text-red-500 w-screen h-screen">Unauthorized</div>
        );
    }
  };

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>;
}

import { Outlet } from "@tanstack/react-router";
import Sidebar from "./Sidebar";
import Card from "../Card";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <div className="flex-1 p-6">
          <Card/>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { Outlet } from "@tanstack/react-router";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="flex">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaCog,
  FaUsers,
  FaBuilding,
  FaChartBar,
} from "react-icons/fa";

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getNavItems = () => {
    const commonItems = [
      { title: "Dashboard", icon: <FaHome />, path: "/dashboard" },
      { title: "Profile", icon: <FaUser />, path: "/dashboard/profile" },
    ];

    switch (user.role) {
      case "admin":
        return [
          ...commonItems,
          { title: "Users", icon: <FaUsers />, path: "/dashboard/users" },
          { title: "Settings", icon: <FaCog />, path: "/dashboard/settings" },
        ];
      case "manager":
        return [
          ...commonItems,
          {
            title: "Facilities",
            icon: <FaBuilding />,
            path: "/dashboard/facilities",
          },
          {
            title: "Bookings",
            icon: <FaCalendarAlt />,
            path: "/dashboard/bookings",
          },
          {
            title: "Reports",
            icon: <FaChartBar />,
            path: "/dashboard/reports",
          },
        ];
      case "user":
        return [
          ...commonItems,
          {
            title: "My Bookings",
            icon: <FaCalendarAlt />,
            path: "/dashboard/my-bookings",
          },
        ];
      default:
        return commonItems;
    }
  };

  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-white shadow-lg overflow-y-auto">
      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <p className="text-sm text-gray-500">Welcome back!</p>
        <p className="font-medium text-gray-700 truncate">
          {user.name || user.email}
        </p>
        <p className="text-xs text-gray-500 capitalize">Role: {user.role}</p>
      </div>

      {/* Navigation */}
      <nav className="py-4">
        {getNavItems().map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#4a6bff]"
            activeProps={{
              className:
                "flex items-center px-4 py-3 bg-blue-50 text-[#4a6bff] border-r-4 border-[#4a6bff]",
            }}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

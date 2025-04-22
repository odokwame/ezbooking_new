import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
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
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await api.getCurrentUser();
        setUserRole(user.role);
        console.log("Currently logged user", user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate({ to: "/login" });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div className="w-64 bg-white h-screen">Loading...</div>;
  }

  const getNavItems = () => {
    const commonItems = [
      {
        title: "Dashboard",
        icon: <FaHome />,
        path: "/dashboard",
      },
      {
        title: "Profile",
        icon: <FaUser />,
        path: "/dashboard/profile",
      },
    ];

    switch (userRole) {
      case "admin":
        return [
          ...commonItems,
          {
            title: "Users",
            icon: <FaUsers />,
            path: "/dashboard/users",
          },
          {
            title: "Settings",
            icon: <FaCog />,
            path: "/dashboard/settings",
          },
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
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-4">
        <p className="text-sm text-gray-500">Welcome back!</p>
      </div>
      <nav className="mt-6">
        {getNavItems().map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            activeProps={{
              className:
                "flex items-center px-4 py-2 bg-gray-100 text-blue-600",
            }}
          >
            <span className="mr-3">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

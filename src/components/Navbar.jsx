import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const getNavItems = useCallback(() => {
    // Navigation items for logged-out users
    if (!user) {
      return [
        { label: "Home", path: "/" },
        { label: "Facilities", path: "/facilities" },
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];
    }

    // Base navigation items for logged-in users
    const items = [
      { label: "Home", path: "/" },
      { label: "Facilities", path: "/facilities" },
      { label: "Bookings", path: "/bookings" },
    ];

    // Add role-specific items
    if (user.role === "admin") {
      items.push(
        { label: "Users", path: "/dashboard/users" },
        { label: "Settings", path: "/dashboard/settings" }
      );
    } else if (user.role === "manager") {
      items.push(
        { label: "My Facilities", path: "/dashboard/facilities" },
        { label: "Reports", path: "/dashboard/reports" }
      );
    }

    return items;
  }, [user]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold">
              <span className="text-[#4a6bff] text-3xl">EZ</span>
              <span className="text-[#FFC800] text-2xl">booking</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {getNavItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-[#4a6bff] px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#4a6bff]"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || user.email || "User"
                      )}`
                    }
                    alt={user.name || user.email || "User"}
                  />
                  <span className="text-sm font-medium">
                    {user.name || user.email || "User"}
                  </span>
                  <FaChevronDown className="h-4 w-4" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaUser className="inline mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="inline mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#4a6bff] focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 mobile-menu">
          <div className="pt-5 pb-6 px-4">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-bold text-[#4a6bff]">
                  EZBook
                </Link>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-[#4a6bff]"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {getNavItems().map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-700 hover:text-[#4a6bff] px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                {user && (
                  <>
                    <Link
                      to="/dashboard/profile"
                      className="text-gray-700 hover:text-[#4a6bff] px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center text-gray-700 hover:text-[#4a6bff] px-3 py-2 rounded-md text-base font-medium"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

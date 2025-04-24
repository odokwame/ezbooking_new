import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
      setIsProfileOpen(false);
      navigate({ to: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close mobile menu and profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.querySelector(".mobile-menu");
      const profileMenu = document.querySelector(".profile-menu");
      const profileButton = document.querySelector(".profile-button");

      if (
        isMobileMenuOpen &&
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        !event.target.closest(".menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }

      if (
        isProfileOpen &&
        profileMenu &&
        !profileMenu.contains(event.target) &&
        !profileButton?.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen, isProfileOpen]);

  // Navigation items based on authentication status
  const navItems = user
    ? [{ label: "Home", path: "/" }]
    : [
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];

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
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-[#4a6bff] px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* User Profile Menu - Desktop */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="profile-button flex items-center space-x-2 text-gray-700 hover:text-[#4a6bff]"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || user.email || "User"
                      )}`
                    }
                    alt={user.name || "User avatar"}
                  />
                  <span className="text-sm font-medium">
                    {user.name || user.email?.split("@")[0] || "User"}
                  </span>
                  <FaChevronDown className="h-4 w-4" />
                </button>

                {isProfileOpen && (
                  <div className="profile-menu absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
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
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="menu-button md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#4a6bff] focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden fixed inset-0 z-50 bg-white overflow-y-auto min-h-screen">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-4 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  className="font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-[#4a6bff] text-3xl">EZ</span>
                  <span className="text-[#FFC800] text-2xl">booking</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-[#4a6bff]"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 px-4 py-6">
              <nav className="grid gap-y-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-700 hover:text-[#4a6bff] px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* User Profile Items - Mobile */}
                {user && (
                  <>
                    <div className="border-t border-gray-200 my-4"></div>
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            user.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name || user.email || "User"
                            )}`
                          }
                          alt={user.name || "User avatar"}
                        />
                        <span className="text-gray-700 font-medium">
                          {user.name || user.email?.split("@")[0] || "User"}
                        </span>
                      </div>
                      <Link
                        to="/dashboard/profile"
                        className="block text-gray-700 hover:text-[#4a6bff] py-2 text-base font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUser className="inline mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-gray-700 hover:text-[#4a6bff] py-2 text-base font-medium"
                      >
                        <FaSignOutAlt className="inline mr-2" />
                        Logout
                      </button>
                    </div>
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

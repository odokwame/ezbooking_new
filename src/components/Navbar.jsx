// Updated Navbar with AuthContext Integration
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

  const { isLogin, user, logout } = useAuth();

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getNavItems = () => {
    if (isLogin) {
      return [
        { to: "/", label: "Home" },
        { to: "/facilities", label: "Facilities" },
        { to: "/dashboard", label: "Dashboard" },
      ];
    }
    return [
      { to: "/login", label: "Login" },
      { to: "/register", label: "Sign Up" },
    ];
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#4a6bff]">
              EZBook
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {getNavItems().map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-700 hover:text-[#4a6bff] px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            {isLogin && user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#4a6bff]"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar || "https://ui-avatars.com/api/?name=User"}
                    alt={user.name || "User"}
                  />
                  <span className="text-sm font-medium">Profile</span>
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
        <div className="md:hidden fixed inset-0 bg-white z-50">
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
                    key={item.to}
                    to={item.to}
                    className="text-gray-700 hover:text-[#4a6bff] px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                {isLogin && (
                  <>
                    <Link
                      to="/dashboard/profile"
                      className="text-gray-700 hover:text-[#4a6bff] px-3 py-2 rounded-md text-base font-medium"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
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

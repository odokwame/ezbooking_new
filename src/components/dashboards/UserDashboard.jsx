import { useState, useEffect } from "react";
import Card from "../Card";
import Button from "../Button";
import { FaCalendarAlt, FaHistory, FaUser, FaBuilding } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { useNavigate } from "@tanstack/react-router";
import NewBookingModal from "../bookings/NewBookingModal";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upcomingBookings, setUpcomingBookings] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch facilities
      const facilitiesData = await api.getFacilities();
      setFacilities(Array.isArray(facilitiesData) ? facilitiesData : []);

      // Fetch user bookings
      const userBookings = await api.getUserBookings();
      const bookingsArray = Array.isArray(userBookings) ? userBookings : [];
      
      // Calculate upcoming bookings
      const upcoming = bookingsArray.filter(booking => {
        if (!booking.date) return false;
        const bookingDate = new Date(booking.date);
        return bookingDate > new Date() && booking.status === 'confirmed';
      }).length;
      
      setUpcomingBookings(upcoming);
      setTotalBookings(bookingsArray.length);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFacilities([]);
      setUpcomingBookings(0);
      setTotalBookings(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "user") {
      fetchData();
    }
  }, [user]);

  const handleFacilityClick = (facilityId) => {
    navigate({ to: "/dashboard/my-bookings", search: { facilityId } });
  };

  const handleBookingSuccess = () => {
    fetchData(); // Refresh data after successful booking
  };

  if (!user || user.role !== "user") {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
            <p className="mt-2 text-gray-600">You don't have permission to view this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-[#4a6bff] flex items-center justify-center">
              <FaUser className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user.name || 'User'}
              </h1>
              <p className="text-sm text-gray-500">
                Manage your bookings and profile
              </p>
            </div>
          </div>
          <Button 
            variant="primary" 
            size="medium"
            onClick={() => setShowBookingModal(true)}
          >
            New Booking
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Upcoming Bookings
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">{upcomingBookings}</p>
                </div>
                <FaCalendarAlt className="h-8 w-8 text-[#4a6bff]" />
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">{totalBookings}</p>
                </div>
                <FaHistory className="h-8 w-8 text-[#4a6bff]" />
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Points Earned
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">{user.points || 0}</p>
                </div>
                <FaUser className="h-8 w-8 text-[#4a6bff]" />
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Facilities Section */}
        <div className="mt-8">
          <Card variant="elevated">
            <Card.Header>
              <h2 className="text-lg font-medium text-gray-900">
                Available Facilities
              </h2>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">Loading facilities...</div>
              ) : facilities.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No facilities available</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {facilities.map((facility) => (
                    <div
                      key={facility.id}
                      onClick={() => handleFacilityClick(facility.id)}
                      className="cursor-pointer p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-[#4a6bff] flex items-center justify-center">
                          <FaBuilding className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{facility.name}</h3>
                          <p className="text-sm text-gray-500">{facility.type}</p>
                        </div>
                      </div>
                      {facility.description && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {facility.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* New Booking Modal */}
        {showBookingModal && (
          <NewBookingModal
            onClose={() => setShowBookingModal(false)}
            onSuccess={handleBookingSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

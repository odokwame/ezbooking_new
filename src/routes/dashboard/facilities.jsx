import { useEffect, useState } from "react";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import FacilityCard from "../../components/facilities/FacilityCard";
import FacilityForm from "../../components/facilities/FacilityForm";
import Button from "../../components/Button";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import Card from "../../components/Card";
import { FaBuilding, FaSearch, FaFilter, FaCalendarAlt, FaTimes, FaClock } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/facilities")({
  component: FacilitiesPage,
});

function QuickBookingModal({ facility, onClose, onSuccess }) {
  const { user } = useAuth();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Format the time to match the expected format (e.g., "10:00am")
      const [hours] = time.split(":");
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "pm" : "am";
      const formattedHour = hour % 12 || 12;
      const formattedTime = `${formattedHour}:00${ampm}`;

      const bookingData = {
        userId: user.id,
        facilityId: facility.id,
        date: date, // The date input already provides the correct format (YYYY-MM-DD)
        startTime: formattedTime
      };

      await api.createBooking(bookingData);
      onSuccess();
      onClose();
    } catch (error) {
      setError(error.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Quick Booking</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">{facility.name}</h3>
          <p className="text-sm text-gray-500">{facility.type}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a6bff] focus:border-transparent"
              />
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <div className="relative">
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a6bff] focus:border-transparent"
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <FaClock className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              size="medium"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="medium"
              className="flex-1"
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FacilitiesPage() {
  const { user } = useAuth();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [facilityTypes, setFacilityTypes] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const add = queryParams.get("add")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.getFacilities();
        setFacilities(data);
        
        // Extract unique facility types
        const types = [...new Set(data.map(facility => facility.type))];
        setFacilityTypes(types);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === "user") {
      fetchData();
    }

    // Only set form open if add parameter is present and we're not already editing
    if (add && !editingFacility) {
      setIsFormOpen(true);
    }
  }, [user]);

  const handleFacilityClick = (facilityId) => {
    navigate({ to: "/dashboard/my-bookings", search: { facilityId } });
  };

  const handleQuickBook = (facility) => {
    setSelectedFacility(facility);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    // You could add a toast notification here
    console.log("Booking created successfully");
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || facility.type === selectedType;
    return matchesSearch && matchesType;
  });

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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Available Facilities</h1>
          <p className="mt-2 text-sm text-gray-500">
            Browse and book facilities for your needs
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search facilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a6bff] focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a6bff] focus:border-transparent"
            >
              <option value="">All Types</option>
              {facilityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Facilities Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a6bff] mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading facilities...</p>
          </div>
        ) : filteredFacilities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No facilities found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <Card key={facility.id} variant="elevated" className="h-full">
                <Card.Body className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-[#4a6bff] flex items-center justify-center">
                      <FaBuilding className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                      <p className="text-sm text-gray-500">{facility.type}</p>
                    </div>
                  </div>

                  {facility.description && (
                    <p className="text-sm text-gray-600">{facility.description}</p>
                  )}

                  <div className="pt-4">
        <Button
          variant="primary"
                      size="medium"
                      className="w-full"
                      onClick={() => handleQuickBook(facility)}
                    >
                      Quick Book
        </Button>
      </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Booking Modal */}
        {showBookingModal && selectedFacility && (
          <QuickBookingModal
            facility={selectedFacility}
            onClose={() => {
              setShowBookingModal(false);
              setSelectedFacility(null);
            }}
            onSuccess={handleBookingSuccess}
          />
          )}
        </div>
    </div>
  );
}

export default FacilitiesPage;

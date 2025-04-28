import { useState, useEffect } from "react";
import { FaTimes, FaCalendarAlt, FaClock, FaBuilding } from "react-icons/fa";
import Button from "../Button";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const NewBookingModal = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await api.getFacilities();
        setFacilities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching facilities:", error);
        setError("Failed to load facilities");
      }
    };

    fetchFacilities();
  }, []);

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
        facilityId: selectedFacility,
        date: date,
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
          <h2 className="text-xl font-semibold text-gray-900">New Booking</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facility
            </label>
            <div className="relative">
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a6bff] focus:border-transparent"
              >
                <option value="">Select a facility</option>
                {facilities.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name} - {facility.type}
                  </option>
                ))}
              </select>
              <FaBuilding className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

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

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

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
              {loading ? "Creating..." : "Create Booking"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBookingModal; 
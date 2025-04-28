import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { FaCalendarAlt, FaClock, FaBuilding, FaTrash, FaEdit } from "react-icons/fa";
import { api } from "../../services/api";

export const Route = createFileRoute('/dashboard/my-bookings')({
  component: MyBookings,
})

function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await api.getUserBookings();
        // Ensure we're working with an array
        console.log("Loaded bookins -> ", data)
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings");
        setBookings([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === "user") {
      fetchBookings();
    }
  }, [user]);

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      await api.deleteBooking(bookingId);
      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Failed to cancel booking");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-sm text-gray-500">
            View and manage your facility bookings
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a6bff] mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading your bookings...</p>
          </div>
        ) : !bookings || bookings.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FaCalendarAlt className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
            <p className="mt-2 text-sm text-gray-500">
              You haven't made any bookings yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} variant="elevated">
                <Card.Body className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-[#4a6bff] flex items-center justify-center">
                        <FaBuilding className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.facilityName || 'Unnamed Facility'}
                        </h3>
                        <p className="text-sm text-gray-500">{booking.facilityType || 'No Type'}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status || 'Unknown'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {booking.date ? new Date(booking.date).toLocaleDateString() : 'No date'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaClock className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{booking.startTime || 'No time'}</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => handleDelete(booking.id)}
                      className="flex items-center space-x-2"
                    >
                      <FaTrash className="h-4 w-4" />
                      <span>Cancel</span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
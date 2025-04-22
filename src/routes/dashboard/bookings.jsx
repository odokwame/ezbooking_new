import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { FaCalendarAlt, FaUser, FaCheck, FaTimes } from "react-icons/fa";

export const Route = createFileRoute("/dashboard/bookings")({
  component: Bookings,
});

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await api.getBookings();
        setBookings(data);
      } catch (error) {
        setError("Failed to fetch bookings");
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            <p className="text-sm text-gray-500">
              Manage and approve facility bookings
            </p>
          </div>
          <div className="flex space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-[#4a6bff] focus:ring-[#4a6bff]"
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} variant="elevated">
              <Card.Body>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-[#4a6bff] flex items-center justify-center">
                      <FaCalendarAlt className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {booking.facilityName}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FaUser className="h-4 w-4" />
                        <span>{booking.userName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {booking.status === "pending" && (
                        <>
                          <Button
                            variant="success"
                            size="small"
                            onClick={() => handleApprove(booking.id)}
                          >
                            <FaCheck />
                          </Button>
                          <Button
                            variant="danger"
                            size="small"
                            onClick={() => handleReject(booking.id)}
                          >
                            <FaTimes />
                          </Button>
                        </>
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

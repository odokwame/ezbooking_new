import { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaBuilding } from "react-icons/fa";
import Card from "../Card";
import Button from "../Button";
import { api } from "../../services/api";

const BookingForm = ({ booking, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    facilityId: booking?.facilityId || "",
    date: booking?.date || "",
    time: booking?.time || "",
    duration: booking?.duration || "1",
    purpose: booking?.purpose || "",
  });

  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const availableFacilities = await api.getFacilities();
        setFacilities(availableFacilities);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card variant="elevated">
      <Card.Body>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Facility Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facility
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
                <select
                  name="facilityId"
                  value={formData.facilityId}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a facility</option>
                  {facilities.map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name} - {facility.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaClock className="text-gray-400" />
                </div>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (hours)
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Purpose
              </label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Please describe the purpose of your booking"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {booking ? "Update Booking" : "Create Booking"}
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default BookingForm; 
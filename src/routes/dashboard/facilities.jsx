import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { FaBuilding, FaEdit, FaTrash } from "react-icons/fa";

export const Route = createFileRoute("/dashboard/facilities")({
  component: Facilities,
});

function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await api.getFacilities();
        setFacilities(data);
      } catch (error) {
        setError("Failed to fetch facilities");
        console.error("Error fetching facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  if (loading) {
    return <div>Loading facilities...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Facilities</h1>
            <p className="text-sm text-gray-500">
              Manage your facilities and their availability
            </p>
          </div>
          <Button variant="primary" size="medium">
            Add New Facility
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <Card key={facility.id} variant="elevated">
              <Card.Body>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#4a6bff] flex items-center justify-center">
                      <FaBuilding className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{facility.name}</h3>
                      <p className="text-sm text-gray-500">{facility.type}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="icon" size="small">
                      <FaEdit />
                    </Button>
                    <Button variant="icon" size="small">
                      <FaTrash />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Capacity:</span>{" "}
                    {facility.capacity}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        facility.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {facility.status}
                    </span>
                  </p>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

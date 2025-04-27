import { useEffect, useState } from "react";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import FacilityCard from "../../components/facilities/FacilityCard";
import FacilityForm from "../../components/facilities/FacilityForm";
import Button from "../../components/Button";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
export const Route = createFileRoute("/dashboard/facilities")({
  component: Facilities,
});

function Facilities() {
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [facilities, setFacilities] = useState(null);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const add = queryParams.get("add")


  useEffect(() => {
    const fetchFacilities = async () => {
      const facilities = await api.getFacilities();
      setFacilities(facilities);
    };
    fetchFacilities();

    // Only set form open if add parameter is present and we're not already editing
    if (add && !editingFacility) {
      setIsFormOpen(true);
    }
  }, [facilities, add]); // Remove facilities from dependency array to prevent infinite loop

  if (!facilities) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (formData) => {
    try {
      if (editingFacility) {
        // Update existing facility
        const updatedFacility = await api.updateFacility(editingFacility.id, {
          ...formData,
          id: editingFacility.id,
          createdBy: editingFacility.createdBy,
        });
        
        // Update the facilities state with the new data
        setFacilities((prev) =>
          prev.map((f) =>
            f.id === editingFacility.id ? updatedFacility : f
          )
        );
      } else {
        // Add new facility
        formData.createdBy = user.id;
        const newFacility = await api.createFacility(formData);
        setFacilities((prev) => [...prev, newFacility]);
      }
      setIsFormOpen(false);
      setEditingFacility(null);
    } catch (error) {
      console.error("Error submitting facility:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleEdit = (facility) => {
    const editingFacility = facilities.find((f) => f.id === facility.id);
    if (editingFacility.createdBy !== user.id) {
      return;
    }
    setEditingFacility(editingFacility);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteFacility(id);
      setFacilities((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Error deleting facility:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facilities</h1>
          <p className="text-sm text-gray-500">Manage your facilities</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setEditingFacility(null);
            setIsFormOpen(true);
          }}
        >
          Add Facility
        </Button>
      </div>

      {isFormOpen ? (
        <FacilityForm
          facility={editingFacility}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingFacility(null);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No facilities found
            </div>
          ) : (
            facilities.map((facility, index) => (
              <FacilityCard
                key={index}
                facility={facility}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Facilities;

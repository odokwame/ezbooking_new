import React from "react";
import Card from "./Card";
import { FaBuilding } from "react-icons/fa";

const SingleFacility = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card variant="elevated">
        <Card.Body>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-[#4a6bff] flex items-center justify-center">
              <FaBuilding className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tennis Court</h3>
              <p className="text-sm text-gray-500">Available</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleFacility;

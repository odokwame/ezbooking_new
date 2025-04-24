import {
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import Card from "../Card";
import Button from "../Button";

const FacilityCard = ({ facility, onEdit, onDelete }) => {
  const { name, description, type, location, price, availability, pictures } =
    facility;

  return (
    <Card variant="elevated" className="h-full">
      <div className="relative">
        <img
          src={
            pictures?.[0] ||
            "https://img.freepik.com/free-vector/school-background-design_1308-21.jpg?t=st=1745524096~exp=1745527696~hmac=ec1ac8ef06e048b07c94eeaddaceabec20b5f764de36b37b0b46ea98a09cdc7d&w=740"
          }
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              availability === "available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {availability}
          </span>
        </div>
      </div>

      <Card.Body className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{type}</p>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            {location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaDollarSign className="mr-2" />
            {price}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaClock className="mr-2" />
            {availability}
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button
            variant="secondary"
            size="small"
            onClick={() => onEdit(facility)}
            className="flex-1"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(facility.id)}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FacilityCard;

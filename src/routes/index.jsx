import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero, SearchBar, Features } from "../components/IndexCompnents";
import { FaBuilding, FaSwimmingPool, FaBasketballBall, FaTableTennis, FaDumbbell, FaRunning } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function FacilityCard({ icon: Icon, title, description, image }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 rounded-full p-2 inline-block">
            <Icon className="h-6 w-6 text-[#4a6bff]" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="primary" size="small" className="w-full">
          Book Now
        </Button>
      </div>
    </div>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  const featuredFacilities = [
    {
      icon: FaSwimmingPool,
      title: "Olympic Swimming Pool",
      description: "State-of-the-art 50-meter pool with temperature control and professional coaching available.",
      image: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: FaBasketballBall,
      title: "Indoor Basketball Court",
      description: "Professional-grade court with electronic scoreboard and locker rooms.",
      image: "https://images.unsplash.com/photo-1546519638-68e109acd27b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: FaTableTennis,
      title: "Tennis Complex",
      description: "Four all-weather courts with night lighting and professional training programs.",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: FaDumbbell,
      title: "Fitness Center",
      description: "Modern equipment, group classes, and personal training services available.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: FaRunning,
      title: "Running Track",
      description: "400-meter synthetic track with proper drainage and timing equipment.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: FaBuilding,
      title: "Multi-Purpose Hall",
      description: "Versatile space for various sports and events with modern amenities.",
      image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[#4a6bff] text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://res.cloudinary.com/ddsuwfx4o/image/upload/v1744992322/ezbook-api/facility-pictures/to-travel-1677347_640.jpg.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a6bff] to-[#6a8bff] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book Your Perfect Sports Facility
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Easy booking for all your sports and fitness needs. Find and reserve facilities in minutes.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="secondary"
                size="large"
                onClick={() => navigate({ to: "/login" })}
              >
                Get Started
              </Button>
              <Button
                variant="primary"
                size="large"
                onClick={() => navigate({ to: "/register" })}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Facilities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Facilities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our state-of-the-art sports facilities designed to meet all your athletic needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFacilities.map((facility, index) => (
            <FacilityCard key={index} {...facility} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Book Your Next Session?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied users who book their sports facilities with us
          </p>
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate({ to: "/register" })}
          >
            Create an Account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

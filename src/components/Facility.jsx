import { useState } from "react";

export default function FacilitiesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recommended");

  // Sample facilities data
  const facilities = [
    {
      id: 1,
      type: "hotel",
      name: "Grand Plaza Hotel",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      price: 120,
      location: "Downtown, City Center",
      rating: 4.5,
      reviews: 128,
      features: [
        { icon: "wifi", label: "Free WiFi" },
        { icon: "swimming-pool", label: "Pool" },
        { icon: "utensils", label: "Restaurant" },
      ],
      isFavorite: false,
    },
    {
      id: 2,
      type: "guest-house",
      name: "Cozy Haven Guest House",
      image: "https://images.unsplash.com/photo-1582719471386-8b6d5578b137",
      price: 65,
      location: "Suburb Area, Quiet Neighborhood",
      rating: 4.0,
      reviews: 64,
      features: [
        { icon: "coffee", label: "Breakfast" },
        { icon: "parking", label: "Free Parking" },
        { icon: "home", label: "Homey Atmosphere" },
      ],
      isFavorite: true,
    },
    // Add more facilities as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-16 text-center mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover and book hotels, guest houses, and other accommodations
            with ease
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex overflow-x-auto pb-2 mb-4">
            {["all", "hotel", "guest-house", "apartment", "resort"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full mr-2 whitespace-nowrap ${
                    activeFilter === filter
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {filter.replace("-", " ")}
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                <i className="fas fa-map-marker-alt"></i>
                Where are you going?
              </label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter location"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                <i className="fas fa-calendar-alt"></i>
                Check In
              </label>
              <input
                type="date"
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                <i className="fas fa-calendar-alt"></i>
                Check Out
              </label>
              <input
                type="date"
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                <i className="fas fa-user-friends"></i>
                Guests
              </label>
              <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5+ Guests</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
            {[
              "Free Cancellation",
              "Breakfast Included",
              "Swimming Pool",
              "WiFi",
              "Parking",
            ].map((feature) => (
              <label key={feature} className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600" />
                <span className="text-sm text-gray-600">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Facilities Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <select
              className="border rounded-lg px-4 py-2"
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Guest Rating</option>
            </select>

            <div className="flex gap-2">
              {["grid", "list", "map"].map((view) => (
                <button
                  key={view}
                  onClick={() => setViewMode(view)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    viewMode === view
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <i
                    className={`fas fa-${view === "grid" ? "th" : view === "list" ? "list" : "map"}`}
                  ></i>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-6`}
          >
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    {facility.type.toUpperCase()}
                  </div>
                  <button className="absolute top-2 right-2 bg-white/90 w-9 h-9 rounded-full flex items-center justify-center">
                    <i
                      className={`${facility.isFavorite ? "fas" : "far"} fa-heart text-red-500`}
                    ></i>
                  </button>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    ${facility.price}
                    <span className="text-gray-300 ml-1">/night</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {facility.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <span>{facility.location}</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < Math.floor(facility.rating) ? "fas" : "far"}`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2">
                      ({facility.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {facility.features.map((feature, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center"
                      >
                        <i className={`fas fa-${feature.icon} mr-1`}></i>
                        {feature.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50">
                      View Details
                    </button>
                    <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 border rounded-lg ${
                  page === 1
                    ? "bg-purple-600 text-white border-purple-600"
                    : "hover:border-purple-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

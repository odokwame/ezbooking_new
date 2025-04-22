import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const locations = [
    "Greater Accra",
    "Volta",
    "Centra Rgion",
    "Survana region",
    "Northen region",
    "Western region",
    "Eastern region",
    "Western North region",
    "Upper East region",
    "Upper West region",
  ];

  const handleSearch = () => {
    console.log(`Searching for "${query}" in "${location}"`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search facilities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-1/3 p-2 border border-gray-300 rounded"
      />
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-1/4 p-2 border border-gray-300 rounded"
      >
        <option value="">Select location</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

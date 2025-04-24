import { Link } from "@tanstack/react-router";
import React from "react";
import SectionCenter from "./SectionCenter";

const Header = () => {
  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Facilities", href: "facilities.html" },
    { name: "Bookings", href: "#" },
    { name: "Login", href: "login.html" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#4a6bff] text-white p-4 flex flex-col md:flex-row justify-between items-center shadow-lg">
      <div className="text-2xl font-bold mb-4 md:mb-0">
        EZ<span className="text-[#ffd700]">Booking</span>
      </div>
      <nav>
        <ul className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#ffd700] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

const Hero = () => (
  <SectionCenter className="bg-gradient-to-r from-[#4a6bff] to-[#6a5acd] text-white py-16 px-4 text-center">
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">
        Book Facilities in Just a Few Clicks
      </h1>
      <p className="text-lg mb-8">
        EZBooking makes it simple to find and reserve the perfect venue, sports
        facility, or meeting room for your needs.
      </p>
      <Link
        to="/register"
        className="bg-[#ffd700] text-gray-800 px-8 py-3 rounded-full font-bold hover:bg-[#ffc800] transition duration-300 inline-block"
      >
        Get Started
      </Link>
      <div className="flex flex-col items-center justify-center"></div>
    </div>
  </SectionCenter>
);

const SearchBar = () => (
  <div className="max-w-4xl mx-auto px-4 -mt-12 mb-8">
    <div className="bg-white p-2 rounded-full shadow-lg flex">
      <input
        type="text"
        placeholder="Search for facilities..."
        className="flex-1 px-6 py-3 rounded-l-full border-none outline-none"
      />
      <button className="bg-[#4a6bff] text-white px-8 py-3 rounded-r-full hover:bg-[#3a5ae8] transition duration-300">
        Search
      </button>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 flex flex-col items-center justify-center rounded-xl shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-2">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: "🏟️",
      title: "Wide Selection",
      description:
        "Choose from hundreds of facilities including sports venues, meeting rooms, and event spaces.",
    },
    {
      icon: "⏱️",
      title: "Instant Booking",
      description:
        "Real-time availability lets you book instantly with instant confirmation.",
    },
    {
      icon: "💰",
      title: "Best Prices",
      description:
        "We guarantee the best prices with no hidden fees or extra charges.",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export { Header, Hero, SearchBar, Features };

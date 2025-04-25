import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero, SearchBar, Features } from "../components/IndexCompnents";

export const Route = createFileRoute('/')({
  component: LandingPage,
});



function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* Hero Section */}
      <section className="bg-blue-50 py-20 text-center">

        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4">Manage Your Hotels, Events & Facilities with Ease</h2>
          <p className="text-lg mb-6 text-gray-600">EZBooking streamlines bookings, improves coordination, and maximizes your revenue.</p>
          <Link to="/dashboard/facilities" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition">Get Started</Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Core Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Hotel Management</h4>
              <p>Manage rooms, rates, availability and bookings with a powerful dashboard.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Event Scheduling</h4>
              <p>Create, organize and monitor event bookings with ease.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Facility Control</h4>
              <p>Schedule and manage shared spaces like halls, conference rooms and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose EZBooking?</h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-xl font-semibold mb-2">Cloud-Based Platform</h4>
              <p>Access your system from anywhere, on any device.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Automated Notifications</h4>
              <p>Keep your staff and clients informed with real-time updates.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Analytics & Reports</h4>
              <p>Make informed decisions with our in-depth reporting tools.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
              <p>Our team is always available to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Elevate Your Booking Management?</h3>
          <p className="mb-6 text-gray-700">Contact us today to get started with EZBooking.</p>
          <a href="mailto:info@ezbooking.com" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold">Email Us</a>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}


import { createFileRoute } from "@tanstack/react-router";
import { Hero, SearchBar, Features } from "../components/IndexCompnents";

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to EZBooking</h1>
      <p className="mt-4 text-xl text-gray-600">
        Find and book facilities with ease
      </p>
    </div>
  );
}

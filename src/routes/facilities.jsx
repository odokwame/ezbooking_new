import { createFileRoute } from "@tanstack/react-router";
import { SearchBar } from "../components/IndexCompnents";
import FacilitiesPage from "../components/Facility";
export const Route = createFileRoute("/facilities")({
  component: FacilitiesPage,
});

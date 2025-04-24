import { createFileRoute } from "@tanstack/react-router";
import { Hero, SearchBar, Features } from "../components/IndexCompnents";
export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <Hero />
      < Features/>
    </div>
  );
}

import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import NotFound from "../components/NotFound";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
      </div>
    </AuthProvider>
  );
}

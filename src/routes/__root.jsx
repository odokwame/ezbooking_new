import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

export const Route = createRootRoute({
  component: RootComponent,
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

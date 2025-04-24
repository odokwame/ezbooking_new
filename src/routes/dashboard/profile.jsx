import { createFileRoute } from "@tanstack/react-router";
import Card from "../../components/Card";
import { useAuth } from "../../contexts/AuthContext";

export const Route = createFileRoute("/dashboard/profile")({
  component: Profile,
});

function Profile() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <Card variant="elevated">
        <Card.Header>
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        </Card.Header>
        <Card.Body>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg">{user?.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Role</h3>
              <p className="mt-1 text-lg capitalize">{user?.role}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

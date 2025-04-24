import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";

export const Route = createFileRoute("/dashboard/profile")({
  component: Profile,
});

function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your update logic here
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500">Manage your account settings</p>
        </div>
        {!isEditing && (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            <FaEdit className="mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Information */}
      <Card variant="elevated">
        <Card.Body>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Password Change Section */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    <FaCheck className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* View Mode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Username
                    </h3>
                    <div className="mt-1 flex items-center">
                      <FaUser className="mr-2 text-gray-400" />
                      <p className="text-lg text-gray-900">{user.userName}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <div className="mt-1 flex items-center">
                      <FaEnvelope className="mr-2 text-gray-400" />
                      <p className="text-lg text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Role</h3>
                    <div className="mt-1 flex items-center">
                      <FaUserTag className="mr-2 text-gray-400" />
                      <p className="text-lg capitalize text-gray-900">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Account Status
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm text-gray-600">Active Account</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Your account has full access to manager features
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Security
                </h3>
                <p className="text-sm text-gray-500">
                  Last password change: Never
                </p>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;

import { useState } from "react";
import Card from "../Card";
import Button from "../Button";
import { FaCalendarAlt, FaHistory, FaUser } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const { user } = useAuth();
  console.log("Currently logged in user:", user);

  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-[#4a6bff] flex items-center justify-center">
              <FaUser className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, User
              </h1>
              <p className="text-sm text-gray-500">
                Manage your bookings and profile
              </p>
            </div>
          </div>
          <Button variant="primary" size="medium">
            New Booking
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Upcoming Bookings
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">3</p>
                </div>
                <FaCalendarAlt className="h-8 w-8 text-[#4a6bff]" />
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                </div>
                <FaHistory className="h-8 w-8 text-[#4a6bff]" />
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Points Earned
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">150</p>
                </div>
                <FaUser className="h-8 w-8 text-[#4a6bff]" />
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Recent Bookings */}
        <div className="mt-8">
          <Card variant="elevated">
            <Card.Header>
              <h2 className="text-lg font-medium text-gray-900">
                Recent Bookings
              </h2>
            </Card.Header>
            <Card.Body>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Facility
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Tennis Court
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2024-03-15
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        14:00 - 15:00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Confirmed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

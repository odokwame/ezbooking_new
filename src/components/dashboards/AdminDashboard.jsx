import { useState } from "react";
import Card from "../Card";
import Button from "../Button";
import { FaUsers, FaBuilding, FaChartLine, FaCog } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-[#4a6bff] flex items-center justify-center">
              <FaCog className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Manage system settings and users
              </p>
            </div>
          </div>
          <Button variant="primary" size="medium">
            Add New User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Quick Stats */}
          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">245</p>
                </div>
                <FaUsers className="h-8 w-8 text-[#4a6bff]" />
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Facilities
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                </div>
                <FaBuilding className="h-8 w-8 text-[#4a6bff]" />
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Bookings Today
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">45</p>
                </div>
                <FaChartLine className="h-8 w-8 text-[#4a6bff]" />
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">$2,450</p>
                </div>
                <FaChartLine className="h-8 w-8 text-[#4a6bff]" />
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Recent Users */}
        <div className="mt-8">
          <Card variant="elevated">
            <Card.Header>
              <h2 className="text-lg font-medium text-gray-900">
                Recent Users
              </h2>
            </Card.Header>
            <Card.Body>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        John Doe
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        john@example.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Manager
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
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

export default AdminDashboard;

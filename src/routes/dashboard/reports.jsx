import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { FaChartBar, FaDownload, FaFilter } from "react-icons/fa";

export const Route = createFileRoute("/dashboard/reports")({
  component: Reports,
});

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("week"); // week, month, year

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await api.getReports(timeRange);
        setReports(data);
      } catch (error) {
        setError("Failed to fetch reports");
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [timeRange]);

  if (loading) {
    return <div>Loading reports...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-sm text-gray-500">
              View analytics and generate reports
            </p>
          </div>
          <div className="flex space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-[#4a6bff] focus:ring-[#4a6bff]"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
            <Button variant="primary" size="medium">
              <FaDownload className="mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Booking Statistics */}
          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Booking Statistics</h3>
                <FaChartBar className="h-6 w-6 text-[#4a6bff]" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <p className="text-2xl font-bold">{reports.totalBookings}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Approval Rate</p>
                  <p className="text-2xl font-bold">{reports.approvalRate}%</p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Facility Utilization */}
          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Facility Utilization</h3>
                <FaChartBar className="h-6 w-6 text-[#4a6bff]" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Average Utilization</p>
                  <p className="text-2xl font-bold">
                    {reports.averageUtilization}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Peak Hours</p>
                  <p className="text-2xl font-bold">{reports.peakHours}</p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Revenue Overview */}
          <Card variant="elevated" className="col-span-1">
            <Card.Body>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Revenue Overview</h3>
                <FaChartBar className="h-6 w-6 text-[#4a6bff]" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    ${reports.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Revenue Growth</p>
                  <p className="text-2xl font-bold">{reports.revenueGrowth}%</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

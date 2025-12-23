import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { BsTicketFill } from "react-icons/bs";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: statistics = {}, isLoading } = useQuery({
    queryKey: ["admin-statistics"],
    queryFn: async () => {
      const result = await axiosSecure.get("/admin-statistics");
      return result.data;
    },
  });

  // Prepare chart data for revenue by seller
  const revenueChartData = useMemo(() => {
    if (statistics.revenueBySellerArray) {
      return statistics.revenueBySellerArray.map((item) => ({
        name: item.email.split("@")[0], // Show username part of email
        revenue: item.revenue,
      }));
    }
    return [];
  }, [statistics.revenueBySellerArray]);

  // Prepare chart data for orders trend
  const ordersChartData = useMemo(() => {
    if (statistics.recentOrders && statistics.recentOrders.length > 0) {
      return statistics.recentOrders.map((order, index) => ({
        name: `Order ${index + 1}`,
        amount: order.price,
        quantity: order.quantity,
      }));
    }
    return [];
  }, [statistics.recentOrders]);

  if (isLoading) return <LoadingSpinner />;

  const {
    totalRevenue = 0,
    totalOrders = 0,
    totalTickets = 0,
    totalUsers = 0,
  } = statistics;

  // Data for pie chart
  const pieData = [
    { name: "Total Orders", value: totalOrders },
    { name: "Total Tickets", value: totalTickets },
  ];

  const COLORS = ["#84cc16", "#fbbf24"];

  return (
    <div>
      <div className="mt-12">
        {/* Key Metrics Cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-4 grow">
          {/* Total Revenue Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-lime-600 to-lime-400 text-white shadow-lime-500/40">
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Revenue
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                ${totalRevenue.toFixed(2)}
              </h4>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40">
              <BsTicketFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Orders
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalOrders}
              </h4>
            </div>
          </div>

          {/* Total Tickets Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-purple-600 to-purple-400 text-white shadow-purple-500/40">
              <BsTicketFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Tickets
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalTickets}
              </h4>
            </div>
          </div>

          {/* Total Users Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40">
              <FaUsers className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Users
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalUsers}
              </h4>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue by Seller Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revenue by Seller
              </h3>
              {revenueChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `$${value.toFixed(2)}`}
                      contentStyle={{
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="revenue"
                      fill="#84cc16"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No revenue data available yet
                </p>
              )}
            </div>
          </div>

          {/* Orders Trend Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Orders Trend
              </h3>
              {ordersChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ordersChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `$${value.toFixed(2)}`}
                      contentStyle={{
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#84cc16"
                      strokeWidth={2}
                      dot={{ fill: "#84cc16", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No order data available yet
                </p>
              )}
            </div>
          </div>

          {/* Overview Pie Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden lg:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Platform Overview
              </h3>
              {totalTickets > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No data available yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Platform Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border-l-4 border-lime-500 pl-4">
                <p className="text-gray-600 text-sm">Average Order Value</p>
                <p className="text-2xl font-bold text-lime-600 mt-1">
                  $
                  {totalOrders > 0
                    ? (totalRevenue / totalOrders).toFixed(2)
                    : "0.00"}
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-600 text-sm">Avg Tickets per Order</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {totalOrders > 0
                    ? (totalTickets / totalOrders).toFixed(1)
                    : "0"}
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-gray-600 text-sm">Active Sellers</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {statistics.revenueBySellerArray?.length || 0}
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {totalUsers}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;

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
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaDollarSign } from "react-icons/fa";
import { BsTicketFill as TicketIcon } from "react-icons/bs";

const SellerStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: statistics = {}, isLoading } = useQuery({
    queryKey: ["seller-statistics", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/seller-statistics/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  // Prepare chart data for revenue trend using useMemo
  const chartData = useMemo(() => {
    if (statistics.recentOrders && statistics.recentOrders.length > 0) {
      return statistics.recentOrders.map((order, index) => ({
        name: `Order ${index + 1}`,
        revenue: order.price,
        quantity: order.quantity,
      }));
    }
    return [];
  }, [statistics.recentOrders]);

  if (isLoading) return <LoadingSpinner />;

  const {
    totalRevenue = 0,
    totalTicketsSold = 0,
    totalTicketsAdded = 0,
  } = statistics;

  // Data for pie chart
  const pieData = [
    { name: "Tickets Sold", value: totalTicketsSold },
    { name: "Tickets Added", value: totalTicketsAdded },
  ];

  const COLORS = ["#84cc16", "#fbbf24"];

  return (
    <div>
      <div className="mt-12">
        {/* Key Metrics Cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 grow">
          {/* Total Revenue Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-purple-600 to-purple-400 text-white shadow-purple-500/40">
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

          {/* Total Tickets Sold Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40">
              <TicketIcon className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Tickets Sold
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalTicketsSold}
              </h4>
            </div>
          </div>

          {/* Total Tickets Added Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-purple-600 to-purple-400 text-white shadow-purple-500/40">
              <TicketIcon className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Tickets Added
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalTicketsAdded}
              </h4>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue Trend Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revenue Trend
              </h3>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
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
                      dataKey="revenue"
                      stroke="#84cc16"
                      strokeWidth={2}
                      dot={{ fill: "#84cc16", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No sales data available yet
                </p>
              )}
            </div>
          </div>

          {/* Sales Distribution Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sales Distribution
              </h3>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="quantity"
                      fill="#84cc16"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No sales data available yet
                </p>
              )}
            </div>
          </div>

          {/* Tickets Overview Pie Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden lg:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tickets Overview
              </h3>
              {totalTicketsAdded > 0 ? (
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
                  No tickets added yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-gray-600 text-sm">
                  Average Revenue per Sale
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  $
                  {totalTicketsSold > 0
                    ? (totalRevenue / totalTicketsSold).toFixed(2)
                    : "0.00"}
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-600 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {totalTicketsAdded > 0
                    ? ((totalTicketsSold / totalTicketsAdded) * 100).toFixed(1)
                    : "0"}
                  %
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-gray-600 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {statistics.recentOrders?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerStatistics;

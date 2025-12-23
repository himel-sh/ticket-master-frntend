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
import { FaDollarSign, FaTicketAlt } from "react-icons/fa";
import { BsTicketFill } from "react-icons/bs";

const CustomerStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: statistics = {}, isLoading } = useQuery({
    queryKey: ["customer-statistics", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/customer-statistics/${user?.email}`
      );
      return result.data;
    },
    enabled: !!user?.email,
  });

  // Prepare chart data for spending by route
  const spendingChartData = useMemo(() => {
    if (statistics.spendingByRouteArray) {
      return statistics.spendingByRouteArray.map((item) => ({
        name:
          item.route.length > 20
            ? item.route.substring(0, 20) + "..."
            : item.route,
        amount: item.amount,
      }));
    }
    return [];
  }, [statistics.spendingByRouteArray]);

  // Prepare chart data for order history
  const orderChartData = useMemo(() => {
    if (statistics.recentOrders && statistics.recentOrders.length > 0) {
      return statistics.recentOrders.map((order, index) => ({
        name: `Order ${index + 1}`,
        spent: order.price,
        tickets: order.quantity,
      }));
    }
    return [];
  }, [statistics.recentOrders]);

  // Prepare status breakdown data
  const statusData = useMemo(() => {
    if (statistics.statusBreakdown) {
      return [
        { name: "Paid", value: statistics.statusBreakdown.paid },
        { name: "Pending", value: statistics.statusBreakdown.pending },
        { name: "Approved", value: statistics.statusBreakdown.approved },
        { name: "Rejected", value: statistics.statusBreakdown.rejected },
      ].filter((item) => item.value > 0);
    }
    return [];
  }, [statistics.statusBreakdown]);

  if (isLoading) return <LoadingSpinner />;

  const {
    totalTicketsBought = 0,
    totalSpent = 0,
    totalOrders = 0,
    averageSpentPerOrder = 0,
  } = statistics;

  const COLORS = ["#84cc16", "#fbbf24", "#60a5fa", "#f87171"];

  return (
    <div>
      <div className="mt-12">
        {/* Key Metrics Cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-4 grow">
          {/* Total Spent Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-lime-600 to-lime-400 text-white shadow-lime-500/40">
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Spent
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                ${totalSpent.toFixed(2)}
              </h4>
            </div>
          </div>

          {/* Total Tickets Bought Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40">
              <BsTicketFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Tickets Bought
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalTicketsBought}
              </h4>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-purple-600 to-purple-400 text-white shadow-purple-500/40">
              <FaTicketAlt className="w-6 h-6 text-white" />
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

          {/* Average Spent Per Order Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40">
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Avg per Order
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                ${averageSpentPerOrder.toFixed(2)}
              </h4>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Spending by Route Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Spending by Route
              </h3>
              {spendingChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={spendingChartData}>
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
                      dataKey="amount"
                      fill="#84cc16"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No spending data available yet
                </p>
              )}
            </div>
          </div>

          {/* Order History Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order History
              </h3>
              {orderChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={orderChartData}>
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
                      dataKey="spent"
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

          {/* Order Status Breakdown Pie Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden lg:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Status Breakdown
              </h3>
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
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
                  No order data available yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Spending Summary */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Spending Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-lime-500 pl-4">
                <p className="text-gray-600 text-sm">Total Amount Spent</p>
                <p className="text-2xl font-bold text-lime-600 mt-1">
                  ${totalSpent.toFixed(2)}
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-600 text-sm">Tickets Purchased</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {totalTicketsBought}
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-gray-600 text-sm">Completed Orders</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {totalOrders}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatistics;

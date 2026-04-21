import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCalendarCheck, FaUsers } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colors = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: chartData = [], isLoading: chartDataLoading } = useQuery({
    queryKey: ["appointmentState"],
    queryFn: async () => {
      const res = await axiosSecure.get("/appointmentState");
      return res.data;
    },
  });
  const { data: adminStats, isLoading: adminStatsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats");
      return res.data;
    },
  });
  const userCount = adminStats?.userCount || 0;
  const appointmentHistoryCount = adminStats?.appointmentHistoryCount || 0;
  const providerCount = adminStats?.providerCount || 0;
  const revenue = adminStats?.revenue || 0;

  if (adminStatsLoading || chartDataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-ball w-16 h-16 text-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const pieChartData = chartData.historyResult?.map((data) => ({
    name: data._id,
    value: data.totalRevenue,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Overview of your service provider platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {userCount.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Completed Appointments */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Completed Appointments
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {appointmentHistoryCount.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FaCalendarCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Total Providers */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Service Providers
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {providerCount.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaUserDoctor className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  ৳ {revenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <GiProfit className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pending Appointments Chart */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Pending Appointments
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData.appointmentResult}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="_id"
                  stroke="#6B7280"
                  fontSize={12}
                  tick={{ fill: "#6B7280" }}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={12}
                  tick={{ fill: "#6B7280" }}
                />
                <Bar
                  dataKey="totalAppointments"
                  fill="#3B82F6"
                  shape={<TriangleBar />}
                  label={{ position: "top", fill: "#6B7280", fontSize: 12 }}
                >
                  {chartData.appointmentResult?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Completed Appointments Chart */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Completed Appointments
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData.historyResult}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="_id"
                  stroke="#6B7280"
                  fontSize={12}
                  tick={{ fill: "#6B7280" }}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={12}
                  tick={{ fill: "#6B7280" }}
                />
                <Bar
                  dataKey="totalAppointments"
                  fill="#10B981"
                  shape={<TriangleBar />}
                  label={{ position: "top", fill: "#6B7280", fontSize: 12 }}
                >
                  {chartData.historyResult?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Pie Chart */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Revenue Distribution
            </h2>
          </div>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{
                    fontSize: "12px",
                    color: "#6B7280",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

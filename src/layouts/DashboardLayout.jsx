import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import useTheme from "../hooks/useTheme";

const DashboardLayout = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative min-h-screen md:flex ${
        isDark ? "bg-gray-950" : "bg-white"
      } transition-colors duration-300`}
    >
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 md:ml-64">
        <div className={`p-5 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

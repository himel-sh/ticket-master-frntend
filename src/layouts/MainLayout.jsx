import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import useTheme from "../hooks/useTheme";

const MainLayout = () => {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? "dark" : ""}>
      <div
        className={`${
          isDark ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
        } min-h-screen transition-colors duration-300`}
      >
        <Navbar />
        <div className="pt-24 min-h-[calc(100vh-68px)]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;

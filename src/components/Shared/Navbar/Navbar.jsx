import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed w-full z-10 shadow-sm ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <span className="text-2xl font-bold text-purple-600">
                TicketMaster
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div
              className={`hidden md:flex items-center gap-8 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <Link
                to="/"
                className={`hover:text-purple-600 font-medium transition ${
                  isDark ? "hover:text-purple-500" : ""
                }`}
              >
                Home
              </Link>
              {user && (
                <Link
                  to="/all-tickets"
                  className={`hover:text-purple-600 font-medium transition ${
                    isDark ? "hover:text-purple-500" : ""
                  }`}
                >
                  All Tickets
                </Link>
              )}
              <Link
                to="/about-us"
                className={`hover:text-purple-600 font-medium transition ${
                  isDark ? "hover:text-purple-500" : ""
                }`}
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className={`hover:text-purple-600 font-medium transition ${
                  isDark ? "hover:text-purple-500" : ""
                }`}
              >
                Contact Us
              </Link>
            </div>

            {/* Theme Toggle and Dropdown Menu */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition ${
                  isDark
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? <BsSun size={20} /> : <BsMoon size={20} />}
              </button>

              {/* Dropdown Menu */}
              <div className="relative">
                <div className="flex flex-row items-center gap-3">
                  {/* Dropdown btn */}
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`p-4 md:py-1 md:px-2 border flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition ${
                      isDark
                        ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                        : "border-neutral-200 bg-white"
                    }`}
                  >
                    <AiOutlineMenu className={isDark ? "text-gray-300" : ""} />
                    <div className="hidden md:block">
                      {/* Avatar */}
                      <img
                        className="rounded-full"
                        referrerPolicy="no-referrer"
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt="profile"
                        height="30"
                        width="30"
                      />
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <div
                    className={`absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] overflow-hidden right-0 top-12 text-sm ${
                      isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
                    }`}
                  >
                    <div className="flex flex-col cursor-pointer">
                      <Link
                        to="/"
                        className={`block md:hidden px-4 py-3 transition font-semibold ${
                          isDark
                            ? "hover:bg-gray-700 text-gray-300"
                            : "hover:bg-neutral-100"
                        }`}
                      >
                        Home
                      </Link>
                      {user && (
                        <Link
                          to="/all-tickets"
                          className={`block md:hidden px-4 py-3 transition font-semibold ${
                            isDark
                              ? "hover:bg-gray-700 text-gray-300"
                              : "hover:bg-neutral-100"
                          }`}
                        >
                          All Tickets
                        </Link>
                      )}
                      <Link
                        to="/about-us"
                        className={`block md:hidden px-4 py-3 transition font-semibold ${
                          isDark
                            ? "hover:bg-gray-700 text-gray-300"
                            : "hover:bg-neutral-100"
                        }`}
                      >
                        About Us
                      </Link>
                      <Link
                        to="/contact-us"
                        className={`block md:hidden px-4 py-3 transition font-semibold ${
                          isDark
                            ? "hover:bg-gray-700 text-gray-300"
                            : "hover:bg-neutral-100"
                        }`}
                      >
                        Contact Us
                      </Link>

                      {user ? (
                        <>
                          <Link
                            to="/dashboard"
                            className={`px-4 py-3 transition font-semibold ${
                              isDark
                                ? "hover:bg-gray-700 text-gray-300"
                                : "hover:bg-neutral-100"
                            }`}
                          >
                            Dashboard
                          </Link>
                          <div
                            onClick={logOut}
                            className={`px-4 py-3 transition font-semibold cursor-pointer ${
                              isDark
                                ? "hover:bg-gray-700 text-gray-300"
                                : "hover:bg-neutral-100"
                            }`}
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className={`px-4 py-3 transition font-semibold ${
                              isDark
                                ? "hover:bg-gray-700 text-gray-300"
                                : "hover:bg-neutral-100"
                            }`}
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            className={`px-4 py-3 transition font-semibold ${
                              isDark
                                ? "hover:bg-gray-700 text-gray-300"
                                : "hover:bg-neutral-100"
                            }`}
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;

import { NavLink, Outlet } from "react-router-dom";
import {
  FaCalendar,
  FaCalendarCheck,
  FaEdit,
  FaHistory,
  FaHome,
  FaPhone,
  FaUsers,
} from "react-icons/fa";
import { MdMessage, MdOutlineMenuOpen } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { BsEnvelopeExclamation } from "react-icons/bs";
import useAdmin from "../hooks/useAdmin";
import useProvider from "../hooks/useProvider";
import { TbLogs, TbCategoryPlus } from "react-icons/tb";
import { FcServices } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isProvider] = useProvider();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-gray-50 dark:bg-gray-900">
        {/* Button for small screens */}
        <label htmlFor="my-drawer-2">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-primary-600 dark:text-primary-400 lg:hidden m-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </label>
        {/* Main Content */}
        <div className="flex-grow p-6 lg:p-8 overflow-y-auto min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-white dark:bg-gray-800 min-h-full w-80 p-6 shadow-xl border-r border-primary-100 dark:border-gray-700">
          {/* Logo/Brand Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              Dashboard
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isAdmin
                ? "Admin Panel"
                : isProvider
                ? "Provider Panel"
                : "User Panel"}
            </p>
          </div>

          {/* Navigation Sections */}
          <div className="space-y-6">
            {/* Conditional Navigation */}
            {isAdmin ? (
              // Admin Navigation
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Admin Tools
                </h3>
                <ul className="space-y-2">
                  <li>
                    <NavLink
                      to="/dashboard/adminHome"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <FaHome className="text-lg" />
                      <span>Admin Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addProviders"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <IoMdPersonAdd className="text-lg" />
                      <span>Add Providers</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addCategory"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <TbCategoryPlus className="text-lg" />
                      <span>Add Category</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manageProviders"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <MdOutlineMenuOpen className="text-lg" />
                      <span>Manage Providers</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manageReviews"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <BsEnvelopeExclamation className="text-lg" />
                      <span>Manage Reviews</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manageContact"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <BsEnvelopeExclamation className="text-lg" />
                      <span>Manage Contact</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manageAppointments"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <FaCalendarCheck className="text-lg" />
                      <span>Manage Appointments</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/completeAppointmentHistory"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <FaCalendarCheck className="text-lg" />
                      <span>Appointment History</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/allUsers"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <FaUsers className="text-lg" />
                      <span>All Users</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : isProvider ? (
              // Provider Navigation
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Provider Tools
                </h3>
                <ul className="space-y-2">
                  <li>
                    <NavLink
                      to="/dashboard/providerHome"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <FaHome className="text-lg" />
                      <span>Provider Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/myServices"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <FcServices className="text-lg" />
                      <span>My Services</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/myAppointmentHistory"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <FaHistory className="text-lg" />
                      <span>My Appointment History</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/myBlogs"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <TbLogs className="text-lg" />
                      <span>My Blogs</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/writeBlogs"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <FaEdit className="text-lg" />
                      <span>Write Blogs</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : (
              // General User Navigation
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  User Tools
                </h3>
                <ul className="space-y-2">
                  <li>
                    <NavLink
                      to="/dashboard/userProfile"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <CgProfile className="text-lg" />
                      <span>My Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/userContact"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <MdMessage className="text-lg" />
                      <span>Contact Messages</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/myAppointment"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <FaCalendar className="text-lg" />
                      <span>My Appointments</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/appointmentHistory"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <FaHistory className="text-lg" />
                      <span>Appointment History</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/reviews"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? "bg-primary-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                        }`
                      }
                    >
                      <BsEnvelopeExclamation className="text-lg" />
                      <span>Reviews</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-primary-100 dark:border-gray-700 pt-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                        isActive
                          ? "bg-primary-600 text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                      }`
                    }
                  >
                    <FaHome className="text-lg" />
                    <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/ourServices"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                        isActive
                          ? "bg-primary-600 text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                      }`
                    }
                  >
                    <MdOutlineMenuOpen className="text-lg" />
                    <span>Our Services</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/appointment"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                        isActive
                          ? "bg-primary-600 text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                      }`
                    }
                  >
                    <FaCalendar className="text-lg" />
                    <span>Appointment</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                        isActive
                          ? "bg-primary-600 text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                      }`
                    }
                  >
                    <FaPhone className="text-lg" />
                    <span>Contact</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

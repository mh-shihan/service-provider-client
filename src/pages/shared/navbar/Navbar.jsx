import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import useAuth from "../../../hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAppointment from "../../../hooks/useAppointment";
import useAdmin from "../../../hooks/useAdmin";
import {
  FaCalendarCheck,
  FaEdit,
  FaHistory,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { BsEnvelopeExclamation } from "react-icons/bs";
import { MdMessage, MdOutlineMenuOpen, MdMenu } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import useProvider from "../../../hooks/useProvider";
import { TbCategoryPlus, TbLogs } from "react-icons/tb";
import { FcServices } from "react-icons/fc";
import useUsers from "../../../hooks/useUser";
import { useState, useEffect, useRef } from "react";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [users] = useUsers();
  const [isAdmin] = useAdmin();
  const [isProvider] = useProvider();
  const [appointment] = useAppointment();
  const { user, logOut } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handelLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Log out!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      color: "#1f2937",
      backdrop: "rgba(0, 0, 0, 0.4)",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        title: "text-xl font-bold text-gray-900",
        content: "text-gray-700",
        confirmButton:
          "rounded-xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200",
        cancelButton:
          "rounded-xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "LogOut Successfully",
              showConfirmButton: false,
              timer: 2000,
              background: "#ffffff",
              color: "#1f2937",
              backdrop: "rgba(0, 0, 0, 0.1)",
              customClass: {
                popup: "rounded-xl shadow-xl border border-green-100",
                title: "text-green-800 font-semibold",
                icon: "text-green-500",
              },
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <div
      className={`px-4 sm:px-8 md:px-20 navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-[50] flex flex-wrap justify-between items-center transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <Link to="/" className="flex items-center gap-2 ml-2 min-w-0">
          <img
            src="/logo.png"
            alt="Service Provider Logo"
            className="h-10 sm:h-12 w-auto object-contain max-w-[500px]"
          />
        </Link>
      </div>
      {/* Hamburger menu for mobile */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        <button
          className="sm:hidden text-3xl p-2 rounded focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <MdMenu />
        </button>
        {/* NavLinks for desktop */}
        <div className="hidden sm:block">
          <NavLinks />
        </div>
        {/* Profile Icon & Dropdown */}
        <div className="relative">
          <button
            tabIndex={0}
            className="text-3xl text-gray-900 hover:text-primary-600 p-1 rounded-full focus:outline-none border-2 border-primary-100  dark:border-gray-600"
            aria-label="Profile menu"
            onClick={() => setProfileOpen((v) => !v)}
          >
            {users?.photoUrl ? (
              <div className="avatar">
                <div className="w-9 rounded-full border-2 border-primary-600 dark:border-primary-400">
                  <img src={users?.photoUrl} alt="User avatar" />
                </div>
              </div>
            ) : (
              <CgProfile />
            )}
          </button>
          {profileOpen && (
            <ul className="absolute right-0 mt-3 w-64 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-primary-100 dark:border-gray-600 rounded-2xl shadow-2xl p-4 z-50 backdrop-blur-sm">
              {isAdmin && (
                <>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/adminHome"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <FaHome className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>Admin Home</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/addProviders"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <IoMdPersonAdd className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>Add Providers</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/AddCategory"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <TbCategoryPlus className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>Add Category</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/manageProviders"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <MdOutlineMenuOpen className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>Manage Providers</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/manageReviews"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <BsEnvelopeExclamation className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>Manage Reviews</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/manageContact"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <BsEnvelopeExclamation className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>Manage Contacts</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/manageAppointments"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <FaCalendarCheck className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>Manage Appointments</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/allUsers"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <FaUsers className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>All Users</span>
                    </Link>
                  </li>
                </>
              )}
              {isProvider && (
                <>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/providerHome"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <FaHome className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>Provider Profile</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/myServices"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <FcServices className="text-lg" />
                      <span>My Services</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/myAppointmentHistory"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <FaHistory className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>My Appointment History</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/myBlogs"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <TbLogs className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>My blogs</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/writeBlogs"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <FaEdit className="text-lg text-primary-600 dark:text-primary-400" />
                      <span>Write blogs</span>
                    </Link>
                  </li>
                </>
              )}
              {!isProvider && !isAdmin && user && (
                <>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/userProfile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <CgProfile className="text-xl text-primary-600 dark:text-primary-400" />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/userContact"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <MdMessage className="text-xl text-primary-600 dark:text-primary-400" />
                      <span>Contact Messages</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/appointmentHistory"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <FaHistory className="text-xl text-primary-600 dark:text-primary-400" />
                      <span>Appointment History</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/myAppointment"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                    >
                      <FaRegCalendarCheck className="text-xl text-primary-600 dark:text-primary-400" />
                      <span>My Appointment</span>
                      <div className="ml-auto bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        {appointment.length}
                      </div>
                    </Link>
                  </li>
                </>
              )}
              <div className="border-t border-primary-100 dark:border-gray-600 mt-4 pt-4">
                {user ? (
                  <button
                    onClick={handelLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200 text-base font-medium w-full text-left text-red-600 dark:text-red-400"
                  >
                    <CiLogout className="text-xl" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 text-base font-medium"
                  >
                    <FiLogIn className="text-xl text-primary-600 dark:text-primary-400" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </ul>
          )}
        </div>
      </div>
      {/* Mobile nav links dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-base-100 shadow-md z-40 animate-fade-in">
          <NavLinks onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Navbar;

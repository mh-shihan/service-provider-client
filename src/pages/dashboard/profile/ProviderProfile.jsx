import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProviderProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [provider, setProvider] = useState(null);
  const { user, logOut } = useAuth();

  useEffect(() => {
    axiosSecure
      .get(`/provider/${user?.email}`)
      .then((res) => setProvider(res.data));
  }, [axiosSecure, user]);

  const handelLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "LogOut Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  if (!provider) {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        <span className="loading loading-spinner loading-lg text-primary-500 scale-150 animate-pulse"></span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-12 px-2 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 flex flex-col items-center">
      <div className="relative w-full max-w-7xl mx-auto mt-10 z-10">
        <div className="backdrop-blur-xl bg-white/80 dark:bg-dark-800/80 rounded-3xl shadow-2xl border border-primary-100 dark:border-dark-700 px-6 md:px-12 py-10 flex flex-col gap-10 animate-fade-in-up">
          {/* Profile Header */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative -mt-32 mb-2">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-primary-400 dark:border-primary-700 shadow-xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-300 dark:from-dark-700 dark:to-dark-900">
                <img
                  src={provider?.userImg}
                  alt="Profile"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
                {provider?.category && (
                  <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs px-3 py-1 rounded-full shadow font-semibold animate-bounce">
                    {provider.category}
                  </span>
                )}
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-1 tracking-tight">
              {provider?.name}
            </h2>
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {provider?.category && (
                <span className="bg-primary-100 text-primary-700 dark:bg-dark-600 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-semibold">
                  {provider.category}
                </span>
              )}
              {provider?.location && (
                <span className="bg-gray-200 dark:bg-dark-800 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <svg
                    className="w-4 h-4 inline-block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {provider.location}
                </span>
              )}
            </div>
            <p className="text-primary-500 font-bold text-center text-base mb-2">
              {provider?.email}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed text-center max-w-2xl mb-2">
              {provider?.about}
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {/* Personal Info */}
            <div>
              <h2 className="text-lg font-bold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label-text font-semibold">Name</label>
                  <div className="text-base font-semibold text-dark-900 dark:text-white py-2">
                    {provider?.name}
                  </div>
                </div>
                <div>
                  <label className="label-text font-semibold">
                    Contact Number
                  </label>
                  <div className="text-base font-semibold text-dark-900 dark:text-white py-2">
                    {provider?.contactNumber}
                  </div>
                </div>
                <div>
                  <label className="label-text font-semibold">Location</label>
                  <div className="text-base font-semibold text-dark-900 dark:text-white py-2">
                    {provider?.location}
                  </div>
                </div>
              </div>
            </div>
            {/* Professional Info */}
            <div>
              <h2 className="text-lg font-bold mb-4">
                Professional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label-text font-semibold">
                    Qualification
                  </label>
                  <div className="text-base font-semibold text-dark-900 dark:text-white py-2">
                    {provider?.qualification}
                  </div>
                </div>
                <div>
                  <label className="label-text font-semibold">Category</label>
                  <div className="text-base font-semibold text-dark-900 dark:text-white py-2">
                    {provider?.category}
                  </div>
                </div>
              </div>
              {/* Education */}
              {provider?.education?.length > 0 && (
                <div className="mt-4">
                  <label className="label-text font-semibold">Education</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {provider.education.map((edu, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-700 dark:bg-dark-600 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {edu.degree} - {edu.institution} ({edu.time})
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Experience */}
              {provider?.workingExperience?.length > 0 && (
                <div className="mt-4">
                  <label className="label-text font-semibold">
                    Working Experience
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {provider.workingExperience.map((exp, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 dark:bg-dark-800 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Services */}
              {provider?.services?.length > 0 && (
                <div className="mt-4">
                  <label className="label-text font-semibold">Services</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {provider.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-primary-50 text-primary-700 dark:bg-dark-600 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Rewards */}
              {provider?.rewards?.length > 0 && (
                <div className="mt-4">
                  <label className="label-text font-semibold">Rewards</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {provider.rewards.map((rew, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {rew.name} - {rew.date} ({rew.description})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Time Table */}
            <div>
              <h2 className="text-lg font-bold mb-4">Time Table</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <div key={day} className="form-control">
                    <label className="label-text font-semibold">{day}</label>
                    <div className="text-base font-semibold text-dark-900 dark:text-white py-2">
                      {provider?.timeTable?.[day] || ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex justify-center gap-3 mt-8">
            <Link
              to={`/dashboard/updateProviderProfile/${provider.email}`}
              type="button"
              className="btn bg-gradient-to-r from-primary-500 to-primary-700 text-white border-none shadow-lg hover:scale-105 hover:from-primary-600 hover:to-primary-800 transition-all duration-200 text-md font-bold py-3 rounded-full"
            >
              Edit Profile
            </Link>
            <button
              type="button"
              className="btn bg-white/80 dark:bg-dark-700/80 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-dark-800 hover:text-primary-700 transition-all duration-200 text-md font-bold py-3 rounded-full shadow-lg"
              onClick={handelLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;

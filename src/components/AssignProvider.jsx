import Loading from "./Loading";
import useProviders from "../hooks/useProviders";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAppointments from "../hooks/useAppointments";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

const AssignProvider = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [allAppointments, refetch] = useAppointments();
  const [providers, providersLoading] = useProviders();
  const axiosSecure = useAxiosSecure();

  // Find the specific appointment
  const appointment = allAppointments.find((app) => app._id === _id);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const selectedProvider = providers.find(
      (provider) => provider._id === data.selectItem
    );

    const appointmentUpdateInfo = {
      appointmentId: _id,
      status: "placed",
      providerEmail: selectedProvider.email,
    };
    console.log("appointment details ", appointmentUpdateInfo);

    Swal.fire({
      title: "Are you sure?",
      text: "You want to assign this provider?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, assign!",
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
        axiosSecure
          .patch("/appointmentUpdateByAdmin", appointmentUpdateInfo)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              reset();
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Appointment Placed to ${selectedProvider.name}`,
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/dashboard/manageAppointments");
            }
          });
      }
    });
  };

  // Show loading if data is not ready
  if (!appointment || providersLoading) {
    return <Loading />;
  }

  // Filter providers based on appointment category
  const requiredProvider = providers.filter(
    (provider) => provider.category === appointment.category
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100/60 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Assign Provider
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Review appointment details and assign a suitable provider
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Appointment Details Card */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <FaCheckCircle className="text-primary-600 dark:text-primary-400" />
              Appointment Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-xl">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <FaCalendarAlt className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Service Type
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {appointment.category || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-xl">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <FaCalendarAlt className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Date
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {appointment.date || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FaClock className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Time
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {appointment.time || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <FaUser className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    User Email
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {appointment.email || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Status
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {appointment.status || "Paid"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Assignment Form */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Assign Provider
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="providerSelect"
                  className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Select Provider for:{" "}
                  <span className="text-primary-600 dark:text-primary-400">
                    {appointment.category}
                  </span>
                </label>

                <div className="relative">
                  <select
                    id="providerSelect"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                    {...register("selectItem", { required: true })}
                  >
                    <option
                      disabled
                      selected
                      className="text-gray-500 dark:text-gray-400"
                    >
                      {appointment.providerEmail ||
                        `Select ${appointment.category} provider`}
                    </option>
                    {requiredProvider.map((provider) => (
                      <option
                        key={provider._id}
                        value={provider._id}
                        className="text-gray-900 dark:text-gray-100"
                      >
                        {`${provider.name} - ${provider.email}`}
                      </option>
                    ))}
                  </select>
                </div>

                {requiredProvider.length === 0 && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-2">
                    No providers available for this category
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={requiredProvider.length === 0}
                className="w-full px-8 py-4 bg-primary-600 dark:bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-700 dark:hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Assign Provider
              </button>
            </form>

            {/* Provider Count */}
            <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
              <p className="text-center text-primary-700 dark:text-primary-300 font-medium">
                {requiredProvider.length} provider
                {requiredProvider.length !== 1 ? "s" : ""} available for this
                category
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignProvider;

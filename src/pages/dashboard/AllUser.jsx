import { Helmet } from "react-helmet";
import "react-tabs/style/react-tabs.css";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// SVG data URI for a generic user avatar
const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23E5E7EB'/%3E%3Cpath d='M24 24c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0 3c-4.418 0-13 2.239-13 6.667V38h26v-4.333C37 29.239 28.418 27 24 27z' fill='%239CA3AF'/%3E%3C/svg%3E";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: users = [],
    loading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-ball w-16 h-16 text-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  const manageChangeRole = (user) => {
    Swal.fire({
      title: "Change Role",
      text: "Choose an option for the user role",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Make Admin",
      cancelButtonText: "Cancel",
      showDenyButton: true,
      denyButtonText: "Make Provider",
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
        denyButton:
          "rounded-xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Make Admin
        axiosSecure.patch(`/user/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is now an Admin.`,
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
          }
        });
      } else if (result.isDenied) {
        // Redirect to the provider role change page
        // Absolute path to avoid issues
        //TODO: set email auto for each user when click specific user role change button
        navigate("/dashboard/addProviders");
      } else {
        // Cancel clicked
        Swal.fire({
          title: "No changes made",
          icon: "info",
          timer: 2000,
          showConfirmButton: false,
          background: "#ffffff",
          color: "#1f2937",
          backdrop: "rgba(0, 0, 0, 0.1)",
          customClass: {
            popup: "rounded-xl shadow-xl border border-blue-100",
            title: "text-blue-800 font-semibold",
            icon: "text-blue-500",
          },
        });
      }
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
      case "provider":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300";
      default:
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <Helmet>
        <title>All Users</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Manage Users
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage all registered users
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Total Users
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {users.length} registered users
              </p>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-600 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-600">
                          <img
                            src={
                              user.photoUrl && user.photoUrl.trim() !== ""
                                ? user.photoUrl
                                : DEFAULT_AVATAR
                            }
                            alt={`${user.name} avatar`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              if (e.target.src !== DEFAULT_AVATAR) {
                                e.target.onerror = null;
                                e.target.src = DEFAULT_AVATAR;
                              }
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.role === "admin" || user.role === "provider" ? (
                        <span className="text-gray-400 dark:text-gray-500 text-sm">
                          Role assigned
                        </span>
                      ) : (
                        <button
                          className="inline-flex items-center gap-2 px-3 py-2 bg-transparent border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white rounded-lg transition-all duration-200 hover:scale-105"
                          onClick={() => manageChangeRole(user)}
                        >
                          <FaEdit className="w-4 h-4" />
                          Change Role
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No users found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                No users have registered yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUser;

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useUsers from "../../../hooks/useUser";
import Loading from "../../../components/Loading.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Resizer from "react-image-file-resizer";
import useAxiosPublic from "../../../hooks/useAxiosPublic.jsx";

const UserProfile = () => {
  const [users, loading, refetch] = useUsers();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { logOut } = useAuth();

  // Reset form when user data loads
  useEffect(() => {
    if (users) {
      setValue("name", users.name || "");
      setValue("phone", users.phone || "");
      setValue("photo", users.photoUrl || "");
      setPreviewImage(users.photoUrl || "");
    }
  }, [users, setValue]);

  const handelLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
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
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
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

  if (loading) return <Loading />;

  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "WEBP",
        90,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const onSubmit = async (data) => {
    if (!data.name?.trim()) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Name is required",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setIsUpdating(true);

    try {
      let photoUrl = users?.photoUrl;

      if (selectedFile) {
        const resizedImage = await resizeImage(selectedFile);
        const formData = new FormData();
        formData.append("file", resizedImage);
        formData.append("upload_preset", preset_key);

        const res = await axiosPublic.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        photoUrl = res.data.secure_url;
      }

      const updatedUserInfo = {
        name: data.name.trim(),
        phone: data.phone?.trim() || "",
        photoUrl,
        email: users?.email,
      };

      const updateRes = await axiosSecure.patch("/user", updatedUserInfo);

      if (updateRes.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully",
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

        // Refresh user data after successful update
        await refetch();

        setIsEditing(false);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 2000,
        background: "#ffffff",
        color: "#1f2937",
        backdrop: "rgba(0, 0, 0, 0.1)",
        customClass: {
          popup: "rounded-xl shadow-xl border border-red-100",
          title: "text-red-800 font-semibold",
          icon: "text-red-500",
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setValue("name", users?.name || "");
    setValue("phone", users?.phone || "");
    setValue("photo", users?.photoUrl || "");
    setPreviewImage(users?.photoUrl || "");
    setSelectedFile(null);
    setIsEditing(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match("image.*")) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Please select an image file",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Image size should be less than 5MB",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-12 text-white text-center relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Profile Settings
              </h1>
              <p className="text-primary-100 text-lg">
                Manage your personal information
              </p>
            </div>
          </div>

          <div className="px-8 py-12 dark:bg-gray-800">
            <div className="flex flex-col items-center mb-12">
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary-100 shadow-xl">
                  <img
                    src={
                      previewImage ||
                      users?.photoUrl ||
                      "https://via.placeholder.com/160x160?text=Profile"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {isEditing && (
                  <label
                    htmlFor="photoUrl"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-60 transition-all duration-300"
                  >
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                    <input
                      type="file"
                      id="photoUrl"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                  {users?.name || "User Name"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {users?.email}
                </p>
              </div>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                        className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 dark:text-white dark:border-gray-500"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                        {users?.name || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Email Address
                    </label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                      {users?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        {...register("phone")}
                        className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 dark:text-white dark:border-gray-500"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                        {users?.phone || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>

            {/* Edit Profile and Logout OUTSIDE the form */}
            {!isEditing && (
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="flex-1 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={handelLogout}
                  className="flex-1 px-8 py-4 border-2 border-red-500 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all duration-300 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

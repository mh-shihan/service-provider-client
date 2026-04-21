import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const AddCategory = () => {
  const [disabled, setDisabled] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();
  // Accessing environment variables
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;

  // Function to resize image
  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, // File to resize
        1080, // Max width
        720, // Max height
        "WEBP", // Output format
        90, // Quality (0-100)
        0, // Rotation
        (uri) => {
          resolve(uri);
        },
        "file" // Output type
      );
    });
  const onSubmit = async (data) => {
    const { serviceProviderType, price, time, image } = data;
    try {
      if (!cloud_name || !preset_key) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cloudinary configuration is missing",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // Resize the image
      const file = image[0];
      const resizedImage = await resizeImage(file);

      // Upload resized image to Cloudinary
      const formData = new FormData();
      formData.append("file", resizedImage);
      formData.append("upload_preset", preset_key);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      const serviceImg = res.data.secure_url;

      const categoryInfo = {
        serviceProviderType,
        price: parseInt(price),
        time,
        serviceImg,
      };
      // console.log(categoryInfo);
      axiosSecure.post("/category", categoryInfo).then((res) => {
        if (res.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Category added successfully",
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
    } catch (error) {
      // Handle errors
      console.error(error);
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
      setDisabled(false);
    }

    // console.log(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <Helmet>
        <title>Add Category</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Add New Service Category
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create a new service category to expand your service offerings
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Information */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Service Categories
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Service categories help organize your offerings and make it
                easier for customers to find the services they need.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
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
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      Organized Services
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Group related services together
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      Better Discovery
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Help customers find services faster
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
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
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      Pricing Control
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Set category-specific pricing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Category Details
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Category Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Medical Consultation, Legal Services"
                  {...register("serviceProviderType", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                />
                {errors.serviceProviderType && (
                  <p className="text-red-500 text-sm">
                    Category name is required
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Appointment Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    {...register("price", { required: true, min: 0 })}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm">
                    Valid price is required
                  </p>
                )}
              </div>

              {/* Appointment Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Appointment Duration *
                </label>
                <input
                  type="text"
                  placeholder="e.g., 30 minutes, 1 hour"
                  {...register("time", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                />
                {errors.time && (
                  <p className="text-red-500 text-sm">
                    Appointment duration is required
                  </p>
                )}
              </div>

              {/* Service Image */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category Image *
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 transition-all duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, WEBP up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      {...register("image", { required: true })}
                    />
                  </label>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-sm">
                    Category image is required
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                disabled={disabled}
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {disabled ? (
                  <div className="loading loading-spinner loading-sm"></div>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
                {disabled ? "Adding Category..." : "Add New Category"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;

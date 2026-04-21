import axios from "axios";
import { Helmet } from "react-helmet";
import { useForm, useFieldArray } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

export default function AddProvider() {
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;
  const [categories, categoriesLoading] = useCategories();
  const [response, setResponse] = useState("");
  const AxiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { fields: educationFields, append: addEducation } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: workingFields, append: addWorkingExperience } = useFieldArray(
    {
      control,
      name: "workingExperience",
    }
  );

  const { fields: servicesFields, append: addService } = useFieldArray({
    control,
    name: "services",
  });

  const { fields: rewardsFields, append: addReward } = useFieldArray({
    control,
    name: "rewards",
  });

  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, // File to resize
        800, // Max width
        800, // Max height
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
    const { image } = data;
    // Get the image file
    const file = image[0];
    const resizedImage = await resizeImage(file);

    // Prepare form data for image upload to Cloudinary
    const formData = new FormData();
    formData.append("file", resizedImage);
    formData.append("upload_preset", preset_key);

    // Upload the image to Cloudinary
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );

    // Get the secure URL of the uploaded image
    const userImg = res.data.secure_url;
    // console.log(userImg);

    // Create the providerInfo object
    const providerInfo = {
      name: data.name || "",
      email: (data.email || "").toLowerCase(),
      userImg: userImg || "",
      qualification: data.qualification || "",
      category: data.category || "",
      rating: 0.0,
      location: data.location || "",
      about: data.about || "",
      education: data.education || [],
      workingExperience: data.workingExperience || [],
      services: data.services || [],
      rewards: data.rewards || [],
      contactNumber: data.contactNumber || "",
      timeTable: {
        Monday: data.timeTable.Monday || "",
        Tuesday: data.timeTable.Tuesday || "",
        Wednesday: data.timeTable.Wednesday || "",
        Thursday: data.timeTable.Thursday || "",
        Friday: data.timeTable.Friday || "",
        Saturday: data.timeTable.Saturday || "",
        Sunday: data.timeTable.Sunday || "",
      },
      totalReview: 0,
    };

    // console.log(providerInfo);
    AxiosSecure.post("/providers", providerInfo).then((res) => {
      if (res.data.insertedId) {
        setResponse("");
        navigate("/");
        scrollTo(0, 0);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Provider added successfully",
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
      } else {
        setResponse(res.data.message);
      }
    });
  };

  if (categoriesLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-ball w-16 h-16 text-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading categories...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <Helmet>
        <title>Add Provider</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Add New Provider
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete the form below to register a new service provider
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Card */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600">
            <div className="flex items-center gap-3 mb-6">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Personal Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <input
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact Number
                </label>
                <input
                  placeholder="+8801*********"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  {...register("contactNumber")}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  placeholder="Dhaka, Bangladesh"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  {...register("location")}
                />
              </div>
            </div>

            {/* About */}
            <div className="mt-6 space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                About
              </label>
              <textarea
                placeholder="Tell us about yourself, your experience, and what makes you unique..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 resize-none"
                rows={4}
                {...register("about")}
              />
            </div>

            {/* Profile Image */}
            <div className="mt-6 space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Profile Image *
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
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
            </div>
          </div>

          {/* Professional Information Card */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Professional Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Qualification */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Qualification
                </label>
                <input
                  placeholder="MSc, PhD, Certification"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  {...register("qualification")}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Service Category *
                </label>
                <select
                  defaultValue="default"
                  {...register("category", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-200"
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.serviceProviderType}>
                      {category.serviceProviderType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Education */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
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
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                <label className="text-lg font-medium text-gray-800 dark:text-white">
                  Education
                </label>
              </div>
              {educationFields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg"
                >
                  <input
                    className="px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                    placeholder="Degree"
                    {...register(`education.${index}.degree`)}
                  />
                  <input
                    className="px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                    placeholder="Institution"
                    {...register(`education.${index}.institution`)}
                  />
                  <input
                    className="px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                    placeholder="Year"
                    {...register(`education.${index}.time`)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addEducation({ degree: "", institution: "", time: "" })
                }
                className="flex items-center gap-2 px-4 py-2 bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
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
                Add Education
              </button>
            </div>

            {/* Working Experience */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
                <label className="text-lg font-medium text-gray-800 dark:text-white">
                  Working Experience
                </label>
              </div>
              {workingFields.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg"
                >
                  <input
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                    placeholder="Describe your work experience"
                    {...register(`workingExperience.${index}`)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addWorkingExperience("")}
                className="flex items-center gap-2 px-4 py-2 bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
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
                Add Experience
              </button>
            </div>

            {/* Services */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <label className="text-lg font-medium text-gray-800 dark:text-white">
                  Services Offered
                </label>
              </div>
              {servicesFields.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg"
                >
                  <input
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                    placeholder="Service name"
                    {...register(`services.${index}`)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addService("")}
                className="flex items-center gap-2 px-4 py-2 bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
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
                Add Service
              </button>
            </div>

            {/* Rewards */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <label className="text-lg font-medium text-gray-800 dark:text-white">
                  Awards & Recognition
                </label>
              </div>
              {rewardsFields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg"
                >
                  <input
                    className="px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                    placeholder="Award name"
                    {...register(`rewards.${index}.name`)}
                  />
                  <input
                    className="px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                    placeholder="Date received"
                    {...register(`rewards.${index}.date`)}
                  />
                  <input
                    className="px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                    placeholder="Description"
                    {...register(`rewards.${index}.description`)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addReward({ name: "", date: "", description: "" })
                }
                className="flex items-center gap-2 px-4 py-2 bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
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
                Add Award
              </button>
            </div>
          </div>

          {/* Schedule Card */}
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Weekly Schedule
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {day}
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                    placeholder={`Time for ${day}`}
                    {...register(`timeTable.${day}`)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
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
              Add Provider
            </button>
          </div>

          {/* Error Message */}
          {response && (
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 font-semibold text-lg bg-red-50 dark:bg-red-900/20 px-6 py-3 rounded-lg border border-red-200 dark:border-red-800">
                {response}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

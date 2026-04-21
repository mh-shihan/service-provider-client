import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCategories from "../../../hooks/useCategories";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const UpdateProviderProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [provider, setProvider] = useState({});
  const { user } = useAuth();
  const location = useLocation();
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_PRESET_KEY;
  const [categories, categoriesLoading] = useCategories();
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState("");

  // Fetch provider data
  useEffect(() => {
    if (location.state?.provider) {
      setProvider(location.state.provider);
      setUserImg(location.state.provider.userImg); // Initialize userImg with existing provider image
    } else {
      axiosSecure.get(`/provider/${user?.email}`).then((res) => {
        setProvider(res.data);
        setUserImg(res.data.userImg); // Initialize userImg with fetched provider image
      });
    }
  }, [axiosSecure, user, location.state]);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: provider,
  });

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
    console.log("Save button clicked");
    const { image } = data;

    let updatedUserImg = userImg; // Use the existing userImg by default

    // Check if a new image is selected
    if (image && image.length > 0) {
      try {
        const file = image[0];
        const resizedImage = await resizeImage(file);

        const formData = new FormData();
        formData.append("file", resizedImage);
        formData.append("upload_preset", preset_key);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        updatedUserImg = res.data.secure_url; // Update userImg with the new image URL
        setUserImg(updatedUserImg); // Update state
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Create the providerInfo object
    const providerInfo = {
      name: data.name || provider.name,
      email: data.email || provider.email,
      userImg: updatedUserImg || provider.userImg, // Use updatedUserImg
      qualification: data.qualification || provider.qualification,
      category: data.category || provider.category,
      rating: provider.rating,
      location: data.location || provider.location,
      about: data.about || provider.about,
      education: data.education || provider.education,
      workingExperience: data.workingExperience || provider.workingExperience,
      services: data.services || provider.services,
      rewards: data.rewards || provider.rewards,
      contactNumber: data.contactNumber || provider.contactNumber,
      timeTable: {
        Monday: data.timeTable.Monday || provider.timeTable?.Monday,
        Tuesday: data.timeTable.Tuesday || provider.timeTable?.Tuesday,
        Wednesday: data.timeTable.Wednesday || provider.timeTable?.Wednesday,
        Thursday: data.timeTable.Thursday || provider.timeTable?.Thursday,
        Friday: data.timeTable.Friday || provider.timeTable?.Friday,
        Saturday: data.timeTable.Saturday || provider.timeTable?.Saturday,
        Sunday: data.timeTable.Sunday || provider.timeTable?.Sunday,
      },
      totalReview: 0,
    };
    axiosSecure.patch("/provider", providerInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        navigate("/dashboard/providerHome");
        scrollTo(0, 0);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Information updated successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "No changes detected!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  // Reset the form when provider data changes
  useEffect(() => {
    if (Object.keys(provider).length > 0) {
      reset(provider);
    }
  }, [provider, reset]);

  if (categoriesLoading)
    return (
      <div className="flex items-center justify-center h-[70vh] bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        <span className="loading loading-spinner loading-lg text-primary-500 scale-150 animate-pulse"></span>
      </div>
    );

  return (
    <div className="relative min-h-screen py-12 px-2 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 flex flex-col items-center">
      <div className="relative w-full max-w-7xl mx-auto mt-10 z-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="backdrop-blur-xl bg-white/80 dark:bg-dark-800/80 rounded-3xl shadow-2xl border border-primary-100 dark:border-dark-700 px-6 md:px-12 py-10 flex flex-col gap-10 animate-fade-in-up"
        >
          {/* Profile Header */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative -mt-32 mb-2">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-primary-400 dark:border-primary-700 shadow-xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-300 dark:from-dark-700 dark:to-dark-900 flex items-center justify-center">
                {userImg ? (
                  <img
                    src={userImg}
                    alt="Profile Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-1 tracking-tight">
              {provider?.name || "Update Profile"}
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
          </div>
          {/* Personal Information Section */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-900/70 shadow p-6 mb-4">
            <h2 className="text-lg font-bold mb-4">Personal Information</h2>
            <div className="md:flex gap-5">
              <div className="flex-1">
                <label className="label-text font-semibold">Name</label>
                <input
                  placeholder="Name"
                  className="input input-bordered w-full"
                  {...register("name")}
                />
              </div>
              <div className="flex-1">
                <label className="label-text font-semibold">Email</label>
                <input
                  placeholder="example@email.com"
                  className="input input-bordered w-full text-red-500"
                  {...register("email")}
                  readOnly
                />
              </div>
            </div>
            <div className="md:flex gap-5 mt-4">
              <div className="flex-1">
                <label className="label-text font-semibold">
                  Contact Number
                </label>
                <input
                  placeholder="+8801*********"
                  className="input input-bordered w-full"
                  {...register("contactNumber")}
                />
              </div>
              <div className="flex-1">
                <label className="label-text font-semibold">Location</label>
                <input
                  placeholder="Dhaka, Bangladesh"
                  className="input input-bordered w-full"
                  {...register("location")}
                />
              </div>
            </div>
            <div className="form-control mt-4">
              <label className="label-text font-semibold">About</label>
              <textarea
                placeholder="Details about You"
                className="textarea textarea-bordered textarea-md w-full max-w-full"
                {...register("about")}
              />
            </div>
            <div className="form-control mt-4">
              <label className="label-text font-semibold">Profile Image</label>
              <input type="file" {...register("image")} />
            </div>
          </div>
          {/* Professional Information Section */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-900/70 shadow p-6 mb-4">
            <h2 className="text-lg font-bold mb-4">Professional Information</h2>
            <div className="flex gap-5">
              <div className="flex-1">
                <label className="label-text font-semibold">
                  Qualification
                </label>
                <input
                  placeholder="MSc, PhD"
                  className="input input-bordered w-full"
                  {...register("qualification")}
                />
              </div>
              <div className="flex-1">
                <label className="label-text font-semibold">Category</label>
                <select
                  defaultValue="default"
                  {...register("category")}
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    Select an item
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
            <div className="mt-4">
              <label className="label-text font-semibold">Education</label>
              {educationFields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2"
                >
                  <input
                    className="input input-bordered w-full md:max-w-xs"
                    placeholder="Degree"
                    {...register(`education.${index}.degree`)}
                  />
                  <input
                    className="input input-bordered w-full md:max-w-xs"
                    placeholder="Institution"
                    {...register(`education.${index}.institution`)}
                  />
                  <input
                    className="input input-bordered w-full md:max-w-xs"
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
                className="btn btn-sm btn-outline mt-2"
              >
                Add Education
              </button>
            </div>
            {/* Experience */}
            <div className="mt-4">
              <label className="label-text font-semibold">
                Working Experience
              </label>
              {workingFields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2"
                >
                  <input
                    className="input input-bordered w-full md:max-w-xs"
                    placeholder="Experience"
                    {...register(`workingExperience.${index}`)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addWorkingExperience("")}
                className="btn btn-sm btn-outline mt-2"
              >
                Add Experience
              </button>
            </div>
            {/* Services */}
            <div className="mt-4">
              <label className="label-text font-semibold">Services</label>
              {servicesFields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2"
                >
                  <input
                    className="input input-bordered w-full md:max-w-xs"
                    placeholder="Service"
                    {...register(`services.${index}`)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addService("")}
                className="btn btn-sm btn-outline mt-2"
              >
                Add Service
              </button>
            </div>
            {/* Rewards */}
            <div className="mt-4">
              <label className="label-text font-semibold">Rewards</label>
              {rewardsFields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2"
                >
                  <input
                    className="input input-bordered w-full md:max-w-xs"
                    placeholder="Reward Name"
                    {...register(`rewards.${index}.name`)}
                  />
                  <input
                    className="input input-bordered w-full md:max-w-xs"
                    placeholder="Date"
                    {...register(`rewards.${index}.date`)}
                  />
                  <input
                    className="input input-bordered w-full md:max-w-xs"
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
                className="btn btn-sm btn-outline mt-2"
              >
                Add Reward
              </button>
            </div>
          </div>
          {/* Time Table Section */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-900/70 shadow p-6 mb-4">
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
                  <input
                    className="input input-bordered w-full"
                    placeholder={`Time for ${day}`}
                    {...register(`timeTable.${day}`)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Save and Cancel Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="btn bg-white/80 dark:bg-dark-700/80 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-dark-800 hover:text-primary-700 transition-all duration-200 text-md font-bold py-3 rounded-full shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-gradient-to-r from-primary-500 to-primary-700 text-white border-none shadow-lg hover:scale-105 hover:from-primary-600 hover:to-primary-800 transition-all duration-200 text-md font-bold py-3 rounded-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProviderProfile;

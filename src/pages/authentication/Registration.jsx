import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Resizer from "react-image-file-resizer";

const Registration = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);

  // Show and hide password
  const handelShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
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
    setDisabled(true);
    const { name, email, password, confirmPassword, image } = data;

    try {
      if (!cloud_name || !preset_key) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cloudinary configuration is missing",
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
      const photoUrl = res.data.secure_url;

      if (password === confirmPassword) {
        // Create user with Firebase
        const userCredential = await createUser(email, password);
        const user = userCredential.user;

        // Update user profile
        await updateUserProfile(name, photoUrl);

        // Save user information in the database
        const userInfo = { name, email: user.email, photoUrl };
        const userRes = await axiosPublic.post("/users", userInfo);

        if (userRes.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account created successfully",
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
          navigate("/");
          scrollTo(0, 0);
        }
      } else {
        setErrorMessage("Password and confirm password should match");
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "Something went wrong",
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-2">
      <Helmet>
        <title>Service | Registration</title>
      </Helmet>
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center py-12">
        <div className="w-full bg-white dark:bg-gray-800 border border-primary-100 dark:border-gray-700 rounded-2xl shadow-xl p-8 md:p-10 animate-fade-in-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="font-extrabold text-center text-3xl md:text-4xl text-primary-600 dark:text-primary-400 mb-2">
              Sign Up
            </h2>
            {/* Name Field */}
            <div className="form-control">
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className="w-full px-5 py-4 border border-primary-200 dark:border-primary-600 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-base transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                  Name is required
                </span>
              )}
            </div>
            {/* Email Field */}
            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="w-full px-5 py-4 border border-primary-200 dark:border-primary-600 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-base transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                  This field is required
                </span>
              )}
            </div>
            {/* Password Field */}
            <div className="form-control relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-5 py-4 border border-primary-200 dark:border-primary-600 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-base transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm pr-12"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 16,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              />
              <div
                onClick={handelShowPassword}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-primary-400 dark:text-primary-300 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password?.type === "required" && (
                <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                  Password required
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                  Password must be at least 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                  Password must be less than 16 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                  Password must have one uppercase, one lowercase, one number,
                  and one special character
                </span>
              )}
            </div>
            {/* Confirm Password */}
            <div className="form-control relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-5 py-4 border border-primary-200 dark:border-primary-600 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-base transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm pr-12"
                {...register("confirmPassword", { required: true })}
              />
              <div
                onClick={handelShowPassword}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-primary-400 dark:text-primary-300 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                  Confirm password is required
                </span>
              )}
            </div>
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-center text-sm animate-fade-in">
                {errorMessage}
              </p>
            )}
            {/* Image Upload */}
            <div className="form-control">
              <input
                type="file"
                {...register("image", { required: true })}
                className="w-full px-3 py-2 border border-primary-200 dark:border-primary-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              {errors.image && (
                <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                  Image is required
                </span>
              )}
            </div>
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                disabled={disabled}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-700 dark:to-primary-500 text-white font-bold rounded-xl shadow-lg hover:from-primary-700 hover:to-primary-600 dark:hover:from-primary-800 dark:hover:to-primary-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-700 text-lg"
              >
                Register Now
              </button>
            </div>
          </form>
          {/* Additional Options */}
          <div className="space-y-5 mt-6">
            <p className="text-gray-700 dark:text-gray-300 text-base text-center">
              Already registered?{" "}
              <span className="font-semibold">
                <Link
                  to="/login"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Go to log in
                </Link>
              </span>
            </p>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-primary-100 dark:border-gray-700"></div>
              <span className="mx-4 text-gray-400 dark:text-gray-500 text-sm">
                or
              </span>
              <div className="flex-grow border-t border-primary-100 dark:border-gray-700"></div>
            </div>
            <div>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

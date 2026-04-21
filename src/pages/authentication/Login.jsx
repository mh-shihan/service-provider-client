// import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn } = useAuth();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  // getting the path name when user navigate by privet route
  const form = location.state?.form?.pathname || "/";

  // show and hide password
  const handelShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `welcome back ${user.displayName}`,
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
        navigate(form, { replace: true });
        scrollTo(0, 0);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-2">
      <Helmet>
        <title>Service | Login</title>
      </Helmet>
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-12">
        <div className="w-full bg-white dark:bg-gray-800 border border-primary-100 dark:border-gray-700 rounded-2xl shadow-xl p-8 md:p-10 animate-fade-in-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="font-extrabold text-center text-3xl md:text-4xl text-primary-600 dark:text-primary-400 mb-2">
              Sign In
            </h2>
            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="w-full px-5 py-4 border border-primary-200 dark:border-primary-600 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-base transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                  Email required
                </span>
              )}
            </div>
            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
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
              {errors.password && (
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
            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-center text-sm animate-fade-in">
                {errorMessage}
              </div>
            )}
            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-700 dark:to-primary-500 text-white font-bold rounded-xl shadow-lg hover:from-primary-700 hover:to-primary-600 dark:hover:from-primary-800 dark:hover:to-primary-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-700 text-lg mt-2"
            >
              Login Now
            </button>
          </form>
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-primary-100 dark:border-gray-700"></div>
            <span className="mx-4 text-gray-400 dark:text-gray-500 text-sm">
              or
            </span>
            <div className="flex-grow border-t border-primary-100 dark:border-gray-700"></div>
          </div>
          {/* Social Login */}
          <div className="flex flex-col gap-4">
            <SocialLogin />
            <p className="text-center text-gray-700 dark:text-gray-300 text-base">
              New here?{" "}
              <Link
                to="/registration"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

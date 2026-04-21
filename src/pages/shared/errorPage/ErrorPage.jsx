import { Link } from "react-router-dom";
import errorImg from "../../../assets/error.png";
import { IoArrowBack } from "react-icons/io5";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-2xl border border-primary-100 dark:border-gray-700 p-8 flex flex-col items-center gap-6 backdrop-blur-xl animate-fade-in-up">
        <img
          className="w-40 h-40 object-contain mb-2 drop-shadow-lg animate-bounce"
          src={errorImg}
          alt="Error"
        />
        <h1 className="text-4xl font-extrabold text-primary-700 dark:text-primary-400 mb-2 text-center">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-4">
          The page you are looking for doesn&apos;t exist or an error occurred.
          <br />
          Please check the URL or return to the homepage.
        </p>
        <Link to="/">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white font-bold text-lg shadow-lg hover:bg-primary-700 transition-colors">
            <IoArrowBack className="text-2xl" /> Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

// import SectionTitle from "../../components/SectionTitle";

const ShortProfile = () => {
  const { _id } = useParams();
  console.log(_id);
  const axiosPublic = useAxiosPublic();
  const [provider, setProvider] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axiosPublic.get(`/providers/${_id}`).then((res) => {
      const data = res.data;
      setProvider(data);
      setCategoryName(data.category);
    });
  }, [_id, axiosPublic]);

  useEffect(() => {
    axiosPublic
      .get("/category", { params: { category: categoryName } })
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      });
  }, [axiosPublic, categoryName]);

  // console.log(provider);
  // console.log(category);

  if (!provider || !category) {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        <span className="loading loading-spinner loading-lg text-primary-500 scale-150 drop-shadow-glass animate-pulse"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Short Profile</title>
      </Helmet>
      <div className="relative min-h-screen py-12 px-2 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 flex flex-col items-center">
        <div className="relative w-full max-w-7xl mx-auto mt-[-60px] z-10">
          {/* Glassy Card */}
          <div className="mt-52 pb-32 backdrop-blur-xl bg-white/80 dark:bg-dark-800/80 rounded-3xl shadow-2xl border border-primary-100 dark:border-dark-700 px-6 md:px-12 py-10 flex flex-col md:flex-row gap-10 transition-opacity duration-700 ease-in-out opacity-100 translate-y-0">
            {/* Profile Avatar & Info */}
            <div className="flex-1 flex flex-col items-center md:items-start relative">
              <div className="relative -mt-24 mb-4 md:mb-6">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-primary-400 dark:border-primary-700 shadow-xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-300 dark:from-dark-700 dark:to-dark-900 transform scale-100 opacity-100 transition-all duration-700">
                  <img
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    src={provider.userImg}
                    alt={provider.name}
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full pointer-events-none animate-pulse"></div>
              </div>
              <h2 className="font-extrabold text-2xl md:text-3xl text-center md:text-left mb-1 tracking-tight dark:text-white">
                {provider.name}
              </h2>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                <span className="bg-primary-100 text-primary-700 dark:bg-dark-400 dark:text-primary-500 px-3 py-1 rounded-full text-xs font-semibold">
                  {provider.qualification}
                </span>
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
              </div>
              <blockquote className="italic text-justify text-gray-600 dark:text-gray-200 text-base md:text-lg leading-relaxed border-l-4 border-primary-200 dark:border-primary-700 pl-4 mt-2 transition-opacity duration-1000 opacity-100">
                {provider.about}
              </blockquote>
            </div>
            {/* Services & Actions */}
            <div className="flex-1 flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-semibold text-xl md:text-2xl mb-3 tracking-wide text-black dark:text-white">
                  Our Services
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-lg mb-4 group">
                  <img
                    className="w-full h-44 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    src={category.serviceImg}
                    alt={category.serviceProviderType}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-primary-100 text-primary-700 dark:bg-dark-400 dark:text-primary-500 px-3 py-1 rounded-full text-xs font-semibold">
                    {category.serviceProviderType}
                  </span>
                </div>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-2">
                  {category.description ||
                    "Professional and reliable services tailored to your needs."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  to="/appointment"
                  state={{ bookingBtnCategory: category }}
                  className="flex-1 btn bg-gradient-to-r from-primary-500 to-primary-700 text-white border-none shadow-lg hover:scale-105 hover:from-primary-600 hover:to-primary-800 transition-all duration-200 text-md font-bold py-3 rounded-full"
                >
                  Book Now
                </Link>
                <Link
                  to={`/fullProfile/${_id}`}
                  state={{ provider, category }}
                  className="flex-1 btn bg-white/80 dark:bg-dark-700/80 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-dark-800 hover:text-primary-700 transition-all duration-200 text-md font-bold py-3 rounded-full shadow-lg"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortProfile;

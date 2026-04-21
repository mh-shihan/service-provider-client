import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import useProviders from "../../hooks/useProviders";

const Banner = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [categories] = useCategories();
  const [providers] = useProviders();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-[600px] bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-primary-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-primary-400 rounded-full opacity-25 animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-primary-200 rounded-full opacity-20 animate-pulse delay-1500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-gray-300 leading-tight">
                Find Your Perfect
                <span className="block text-primary-600">Service Provider</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-white max-w-lg leading-relaxed">
                Connect with trusted professionals in your area. Quality
                services guaranteed with transparent pricing and secure booking.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {providers?.length || 0}+
                </div>
                <div className="text-sm text-gray-600">Expert Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {categories?.length || 0}+
                </div>
                <div className="text-sm text-gray-600">Service Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  4.8
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/ourServices")}
                className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Services
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-8 py-4 border border-b-4 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-600 hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Animated Illustration */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10">
                <img
                  src="https://res.cloudinary.com/dipwayvsu/image/upload/v1752428658/rkxyaxalya3i1jzcri4x.webp"
                  alt="Service Provider"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 text-xl">⭐</span>
                  </div>
                  <div className="w-20 h-20"></div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg animate-bounce delay-1000">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Verified</div>
                    <div className="text-sm text-gray-600">100% Secure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

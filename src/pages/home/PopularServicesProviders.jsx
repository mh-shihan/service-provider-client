import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import ShortProfileCart from "../../components/ShortProfileCart";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const PopularServicesProviders = () => {
  const navigate = useNavigate();
  const [topProviders, setTopProviders] = useState([]);
  const axiosPublic = useAxiosPublic(); // Axios instance for public API calls

  useEffect(() => {
    let isMounted = true; // Prevents updating state on an unmounted component

    const fetchData = async () => {
      try {
        const res = await axiosPublic.get("/topProvider");
        if (isMounted && res.data.length > 0) {
          setTopProviders(res.data); // Update state with providers
        } else {
          console.warn("No popular service providers found.");
        }
      } catch (error) {
        console.error("Error fetching top providers:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [axiosPublic]);

  return (
    <section className="relative  bg-gradient-to-br from-primary-50 via-white to-primary-100/60 w-full">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <SectionTitle
            heading="Popular Services"
            subHeading="from our services"
          />
        </div>
        {topProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-20">
            {topProviders.map((provider) => (
              <div key={provider._id}>
                <ShortProfileCart user={provider} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-20">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center animate-pulse"
              >
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-5 w-28 bg-gray-200 rounded mb-2" />
                <div className="h-5 w-36 bg-gray-200 rounded mb-2" />
                <div className="h-5 w-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              navigate("/ourServices");
              scrollTo(0, 0);
            }}
            className="btn bg-transparent border-1 border-b-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 text-lg"
          >
            Show all
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularServicesProviders;

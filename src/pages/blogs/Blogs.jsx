import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Blog from "./Blog";
import useCategories from "../../hooks/useCategories";
import { Helmet } from "react-helmet";

const Blogs = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);
  const [displayBlogs, setDisplayBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("allCategory"); // New state for active category
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const categoriesData = useCategories();
  const categories = Array.isArray(categoriesData[0]) ? categoriesData[0] : [];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosPublic.get("/blogs");
        setBlogs(res.data);
        setDisplayBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [axiosPublic]);

  const handelFilterBlogs = (category) => {
    setActiveCategory(category);
    if (category === "allCategory") {
      setDisplayBlogs(blogs);
    } else {
      const filteredBlogs = blogs.filter((blog) => blog.category === category);
      setDisplayBlogs(filteredBlogs);
    }
  };

  if (!categories || !blogs.length) {
    return (
      <div className="pt-16">
        <Helmet>
          <title>Blogs</title>
        </Helmet>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-10">
          <div className=" space-y-3 pl-5">
            <div className="skeleton h-10 w-72"></div>
            <div className="skeleton h-14 w-44"></div>
            <div className="skeleton h-14 w-44"></div>
            <div className="skeleton h-14 w-44"></div>
            <div className="skeleton h-14 w-44"></div>
          </div>

          {/* middle section  */}
          <div className="md:col-span-2 h-[80vh] overflow-y-auto min-h-screen px-5">
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-200 justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-200 justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-200 justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-200 justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
          </div>

          {/* middle section */}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gradient-to-br from-primary-50 via-white to-primary-100/60 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10 max-w-7xl mx-auto">
        {/* Categories section (desktop/tablet) */}
        <div className="hidden md:block md:col-span-1 h-[80vh] overflow-y-auto sticky top-20">
          <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-sm dark:shadow-gray-900/50 flex flex-col gap-2">
            <button
              onClick={() => handelFilterBlogs("allCategory")}
              className={`block w-full px-4 py-2 text-lg font-bold rounded-lg transition-colors mb-1
                ${
                  activeCategory === "allCategory"
                    ? "bg-primary-600 text-white"
                    : "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800/40"
                }
              `}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                className={`block w-full px-4 py-2 text-lg font-bold rounded-lg transition-colors mb-1
                  ${
                    activeCategory === category.serviceProviderType
                      ? "bg-primary-600 text-white"
                      : "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800/40"
                  }
                `}
                key={category._id}
                onClick={() => handelFilterBlogs(category.serviceProviderType)}
              >
                {category.serviceProviderType}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile Categories Button & Slide-in */}
        <div className="md:hidden col-span-2 mb-4 px-2">
          <button
            className="w-full py-3 rounded-lg bg-primary-600 text-white font-bold text-lg shadow-sm flex items-center justify-center gap-2"
            onClick={() => setMobileCatOpen(true)}
          >
            Categories
          </button>
          {mobileCatOpen && (
            <div className="fixed inset-0 z-50 bg-black/30 flex">
              <div className="w-3/4 max-w-xs bg-white dark:bg-gray-700 h-full shadow-xl p-6 flex flex-col gap-2 animate-slide-in-left">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-primary-700 dark:text-primary-400">
                    Categories
                  </span>
                  <button
                    className="text-2xl text-gray-700 dark:text-gray-200 p-2 hover:bg-primary-100 dark:hover:bg-primary-800/40 rounded"
                    onClick={() => setMobileCatOpen(false)}
                    aria-label="Close categories"
                  >
                    &times;
                  </button>
                </div>
                <button
                  onClick={() => {
                    handelFilterBlogs("allCategory");
                    setMobileCatOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-lg font-bold rounded-lg transition-colors mb-1
                    ${
                      activeCategory === "allCategory"
                        ? "bg-primary-600 text-white"
                        : "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800/40"
                    }
                  `}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    className={`block w-full px-4 py-2 text-lg font-bold rounded-lg transition-colors mb-1
                      ${
                        activeCategory === category.serviceProviderType
                          ? "bg-primary-600 text-white"
                          : "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800/40"
                      }
                    `}
                    key={category._id}
                    onClick={() => {
                      handelFilterBlogs(category.serviceProviderType);
                      setMobileCatOpen(false);
                    }}
                  >
                    {category.serviceProviderType}
                  </button>
                ))}
              </div>
              <div className="flex-1" onClick={() => setMobileCatOpen(false)} />
            </div>
          )}
        </div>
        {/* Blog section (center, 2 columns) */}
        <div className="md:col-span-2 h-[80vh] overflow-y-auto min-h-screen px-0">
          {displayBlogs.length > 0 ? (
            displayBlogs.map((blog) => <Blog key={blog._id} blog={blog} />)
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
              No blogs found in this category
            </p>
          )}
        </div>
        {/* Additional section (right, 1 column) */}
        <div className="md:col-span-1 col-span-1 h-[80vh] overflow-y-auto sticky top-20">
          <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-sm dark:shadow-gray-900/50">
            <h1 className="font-semibold text-xl mb-2 text-gray-900 dark:text-gray-200">
              Additional content
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              We can show anything in this section
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

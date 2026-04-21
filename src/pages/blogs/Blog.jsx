import { CiBookmark, CiShare2 } from "react-icons/ci";
// import { RxEyeOpen } from "react-icons/rx";
import { Link } from "react-router-dom";
// import { Rating } from "@smastrom/react-rating";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MainNews = ({ blog }) => {
  const {
    _id,
    authorEmail,
    time,
    date,
    title,
    content,
    // rating,
    img,
    // totalView,
  } = blog;
  const axiosPublic = useAxiosPublic();
  const [author, setAuthor] = useState(null);

  // Fetch author details
  useEffect(() => {
    if (authorEmail) {
      axiosPublic
        .get(`/providersInBlog/${authorEmail}`)
        .then((res) => setAuthor(res.data))
        .catch((err) => console.error("Error fetching author:", err));
    }
  }, [authorEmail, axiosPublic]);

  const handleSaveButton = () => {
    Swal.fire({
      title: "Feature not added!",
      icon: "info",
      background: "#ffffff",
      color: "#1f2937",
      backdrop: "rgba(0, 0, 0, 0.1)",
      customClass: {
        popup: "rounded-xl shadow-xl border border-blue-100",
        title: "text-blue-800 font-semibold",
        icon: "text-blue-500",
      },
    });
  };

  return (
    <div className="mb-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-sm dark:shadow-gray-900/50 hover:shadow-md transition-all duration-150 flex flex-col gap-4">
      {/* Header: Author info and actions */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-600">
        <div className="flex items-center gap-3">
          {author ? (
            <>
              <img
                className="rounded-full w-12 h-12 object-cover object-center border-2 border-primary-100 dark:border-primary-700"
                src={author.userImg}
                alt={author.name}
              />
              <div>
                <p className="font-semibold text-lg text-gray-900 dark:text-gray-200">
                  {author.name}
                </p>
                <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>{date}</span>
                  <span>{time}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-52 flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-3 w-20"></div>
                  <div className="skeleton h-3 w-28"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSaveButton}
            className="text-xl text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-lg transition-colors"
            title="Bookmark"
          >
            <CiBookmark />
          </button>
          <button
            onClick={handleSaveButton}
            className="text-xl text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-lg transition-colors"
            title="Share"
          >
            <CiShare2 />
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-4 mt-2">
        <p className="font-bold text-2xl text-gray-900 dark:text-gray-200">
          {title}
        </p>
        <img
          className="h-64 w-full object-cover rounded-lg border border-gray-100 dark:border-gray-600"
          src={img}
          alt={"Image not available"}
        />
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {content.length > 200 ? (
            <>
              {content.slice(0, 200)}
              <Link
                to={`/blog/${_id}`}
                className="text-primary-600 dark:text-primary-400 font-semibold ml-1 hover:underline"
              >
                Read more...
              </Link>
            </>
          ) : (
            content
          )}
        </p>
      </div>
    </div>
  );
};

export default MainNews;

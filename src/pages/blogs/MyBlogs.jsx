import { useEffect, useState } from "react";
import useUsers from "../../hooks/useUser";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const MyBlogs = () => {
  const [users] = useUsers();
  const axiosSecure = useAxiosSecure();
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = users?.email; // ✅ Use email instead of _id

  useEffect(() => {
    if (!userEmail) return;

    const fetchMyBlogs = async () => {
      try {
        console.log("Fetching blogs for user email:", userEmail);
        const res = await axiosSecure.get(`/myBlogs/${userEmail}`);
        console.log("API Response:", res.data);
        setMyBlogs(res.data);
      } catch (error) {
        console.error(
          "Error fetching blogs:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [axiosSecure, userEmail]);

  return (
    <>
      <Helmet>
        <title>My Blogs</title>
      </Helmet>
      <div className="py-10 bg-gray-50 min-h-screen">
        <div className="md:col-span-2 h-[80vh] overflow-y-auto min-h-screen px-5">
          {loading ? (
            <p className="text-center text-gray-500 mt-5">Loading blogs...</p>
          ) : myBlogs.length > 0 ? (
            myBlogs.map((blog) => (
              <div
                key={blog._id}
                className="mb-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-150 flex flex-col gap-4"
              >
                <p className="font-bold text-2xl text-gray-900">{blog.title}</p>
                <img
                  className="h-64 w-full object-cover rounded-lg border border-gray-100"
                  src={blog.img}
                  alt="Blog Image"
                />
                <p className="text-gray-700 text-base">
                  {blog.content.length > 200 ? (
                    <>
                      {blog.content.slice(0, 200)}
                      <Link
                        to={`/dashboard/myBlogDetails/${blog._id}`}
                        className="text-primary-600 font-semibold ml-1 hover:underline"
                      >
                        Read more...
                      </Link>
                    </>
                  ) : (
                    blog.content
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">No blogs found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBlogs;

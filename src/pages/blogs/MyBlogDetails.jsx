import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Helmet } from "react-helmet";

const MyBlogDetails = () => {
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle error messages

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosPublic.get(`/blog/${_id}`);
        setBlog(res.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError("Invalid blog ID format");
        } else if (error.response && error.response.status === 404) {
          setError("Blog not found");
        } else {
          setError("An error occurred while fetching the blog.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [_id, axiosPublic]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <>
      <Helmet>
        <title>My Blog Details</title>
      </Helmet>
      <div className="lg:max-w-[90%] max-w-[95%] mx-auto min-h-screen py-10">
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <h1 className="font-bold text-3xl mb-4 text-primary-700">
            {blog.title}
          </h1>
          <img
            className="w-full max-h-96 object-cover rounded-lg mb-6 border border-gray-100"
            src={blog.img}
            alt="Blog"
          />
          <p className="text-lg text-gray-800 mb-6 text-justify">
            {blog.content}
          </p>
        </div>
      </div>
    </>
  );
};

export default MyBlogDetails;

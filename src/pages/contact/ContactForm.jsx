import { FaPaperPlane } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const ContactForm = () => {
  const { user } = useAuth();
  const AxiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const contactSMSInfo = {
      ...data,
      createdAt: Date.now(),
    };

    console.log(contactSMSInfo);

    AxiosSecure.post("/contacts", contactSMSInfo)
      .then((res) => {
        if (res.data.insertedId) {
          navigate("/");
          scrollTo(0, 0);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Message sent successfully",
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
        }
      })
      .catch((error) => {
        console.error("Error submitting contact message:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
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
      });
  };
  if (!user) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 mt-8 animate-fade-in-up"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full relative group">
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder=" "
            className="peer w-full p-5 border border-primary-200 dark:border-primary-600 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-base transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:shadow-primary-100 dark:focus:shadow-primary-900/20"
          />
          <label className="absolute left-5 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-1 text-primary-500 dark:text-primary-400 pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-600 dark:peer-focus:text-primary-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-primary-500 dark:peer-placeholder-shown:text-primary-400 peer-focus:bg-white dark:peer-focus:bg-gray-800">
            Name
          </label>
          {errors.name && (
            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
              Name is required
            </span>
          )}
        </div>
        <div className="w-full relative group">
          <input
            {...register("phone", { required: true })}
            type="text"
            placeholder=" "
            className="peer w-full p-5 border border-primary-200 dark:border-primary-600 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-base transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:shadow-primary-100 dark:focus:shadow-primary-900/20"
          />
          <label className="absolute left-5 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-1 text-primary-500 dark:text-primary-400 pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-600 dark:peer-focus:text-primary-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-primary-500 dark:peer-placeholder-shown:text-primary-400 peer-focus:bg-white dark:peer-focus:bg-gray-800">
            Phone number
          </label>
          {errors.phone && (
            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
              Phone number is required
            </span>
          )}
        </div>
      </div>
      <div className="w-full relative group">
        <input
          disabled
          {...register("email")}
          type="email"
          placeholder={user.email}
          value={user.email}
          className="peer w-full p-5 border border-primary-100 dark:border-primary-700 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed focus:outline-none text-base"
        />

        {errors.email && (
          <span className="text-red-500 text-sm mt-1 block animate-fade-in">
            Email address is required
          </span>
        )}
      </div>
      <div className="w-full relative group">
        <textarea
          {...register("message", { required: true })}
          placeholder=" "
          className="peer w-full p-5 border border-primary-200 dark:border-primary-600 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-base min-h-[120px] md:min-h-[160px] transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:shadow-primary-100 dark:focus:shadow-primary-900/20"
        ></textarea>
        <label className="absolute left-5 top-6 bg-white dark:bg-gray-800 px-1 text-primary-500 dark:text-primary-400 pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-600 dark:peer-focus:text-primary-400 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-primary-500 dark:peer-placeholder-shown:text-primary-400 peer-focus:bg-white dark:peer-focus:bg-gray-800">
          Type Your Message
        </label>
        {errors.message && (
          <span className="text-red-500 text-sm mt-1 block animate-fade-in">
            Message is required
          </span>
        )}
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="w-full py-5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-lg hover:from-primary-600 hover:to-primary-800 transition-all duration-200 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
        >
          <span className="group-hover:animate-paperplane-move">
            <FaPaperPlane />
          </span>
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;

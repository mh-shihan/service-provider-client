import { Helmet } from "react-helmet";
import SectionTitle from "../../components/SectionTitle";
import SectionBanner from "../../components/SectionBanner";
import useCategories from "../../hooks/useCategories";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useAppointment from "../../hooks/useAppointment";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUser";

const Appointment = () => {
  const navigate = useNavigate();
  const [, refetch] = useAppointment();
  const AxiosSecure = useAxiosSecure();
  const [categories] = useCategories();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [timeSlot, setTimeSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(null);
  const [slotTime, setSlotTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [submittedCategory, setSubmittedCategory] = useState("");
  const [submittedPrice, setSubmittedPrice] = useState("");
  const [submittedTime, setSubmittedTime] = useState("");

  const { user } = useAuth();
  const [users] = useUsers();

  const handleCategoryClick = (
    categoryId,
    categoryName,
    categoryPrice,
    categoryTime
  ) => {
    setSelectedCategory(categoryId);
    setSubmittedCategory(categoryName);
    setSubmittedPrice(categoryPrice);
    setSubmittedTime(categoryTime);
  };

  const getAvailableSlot = () => {
    const today = new Date();
    const next7DaysSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const slots = [];
      let slotTime = new Date(currentDate);
      // Start time: 10:00 AM
      slotTime.setHours(10, 0, 0, 0);
      const endTime = new Date(currentDate);
      // End time: 9:00 PM
      endTime.setHours(21, 0, 0, 0);

      while (slotTime < endTime) {
        // Check if this slot is in the future
        const now = new Date();
        const slotDateTime = new Date(slotTime);

        // If it's today, only show slots that are at least 1 hour in the future
        if (currentDate.toDateString() === today.toDateString()) {
          const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
          if (slotDateTime >= oneHourFromNow) {
            slots.push({
              dateTime: new Date(slotTime),
              time: slotTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
          }
        } else {
          // For future days, show all slots
          slots.push({
            dateTime: new Date(slotTime),
            time: slotTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        }

        // Increment by 2 hours
        slotTime.setHours(slotTime.getHours() + 2);
      }

      // Only add the day if it has available slots
      if (slots.length > 0) {
        next7DaysSlots.push(slots);
      }
    }

    setTimeSlot(next7DaysSlots);
  };

  useEffect(() => {
    getAvailableSlot();
  }, []);

  const handleDateClick = (index) => {
    setSlotIndex(index);
    const date = timeSlot[index][0].dateTime.toDateString();
    setSelectedDate(date);
    setSlotTime("");
  };

  const handleTimeClick = (time) => {
    if (selectedCategory && slotIndex !== null) {
      setSlotTime(time);
    }
  };

  const handleAppointment = () => {
    const appointmentDetails = {
      category: submittedCategory,
      date: selectedDate,
      time: slotTime,
      price: submittedPrice,
      email: user.email,
      userName: users.name || "null",
      userId: users._id,
      createdAt: new Date(),
    };

    AxiosSecure.post("/appointments", appointmentDetails).then((res) => {
      if (res.data.insertedId) {
        refetch();
        navigate("/checkout");
        scrollTo(0, 0);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Appointment booked successfully",
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
    });
  };

  return (
    <section className="pt-28 min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100/60 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-10">
      <div className="-mt-20 max-w-screen-2xl mx-auto px-4 md:px-8">
        <Helmet>
          <title>Appointment</title>
        </Helmet>
        <SectionBanner
          img={
            "https://res.cloudinary.com/dipwayvsu/image/upload/v1752419597/vyjtgcktybbhk6vpncf8.webp"
          }
          title="Appointment"
        />
        <div className="mb-12 text-center">
          <SectionTitle
            heading={"Book an appointment"}
            subHeading={"Find your requirements"}
          />
        </div>
        <div className="flex flex-col-reverse md:flex-row-reverse gap-10 lg:px-20 md:px-12 px-0">
          {/* Booking Summary Card */}
          <aside className="md:w-1/4 mt-10 md:mt-0">
            <div className="bg-white/90 dark:bg-gray-700/90 py-7 px-5 rounded-2xl shadow-2xl sticky top-32 space-y-6 flex flex-col border border-primary-100 dark:border-gray-600">
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-2 text-center">
                Booking Summary
              </h3>
              <div className="flex justify-between text-base text-gray-900 dark:text-gray-200">
                <span className="font-medium">Category:</span>
                <span>
                  {selectedCategory ? submittedCategory : "Select category"}
                </span>
              </div>
              <div className="flex justify-between text-base text-gray-900 dark:text-gray-200">
                <span className="font-medium">Price (taka):</span>
                <span>
                  {selectedCategory ? submittedPrice : "Select category"}
                </span>
              </div>
              <div className="flex justify-between text-base text-gray-900 dark:text-gray-200">
                <span className="font-medium">Meeting Time:</span>
                <span>
                  {selectedCategory ? submittedTime : "Select category"}
                </span>
              </div>
              <div className="flex justify-between text-base text-gray-900 dark:text-gray-200">
                <span className="font-medium">Date:</span>
                <span>{selectedDate || "Select Date"}</span>
              </div>
              <div className="flex justify-between text-base text-gray-900 dark:text-gray-200">
                <span className="font-medium">Time:</span>
                <span>{slotTime || "Select Time"}</span>
              </div>
              <button
                onClick={handleAppointment}
                disabled={!selectedCategory || !selectedDate || !slotTime}
                className={`mt-6 w-full px-6 py-3 rounded-full font-semibold text-lg shadow-md transition-all duration-200
                  bg-primary-500 text-white hover:bg-primary-600
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Book now
              </button>
            </div>
          </aside>
          {/* Main Booking Area */}
          <main className="md:w-3/4 md:pr-20 pr-0">
            <div className="mb-10">
              <h2 className="font-bold text-2xl md:text-3xl text-primary-600 dark:text-primary-400 mb-4">
                Select Category
              </h2>
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    onClick={() =>
                      handleCategoryClick(
                        category._id,
                        category.serviceProviderType,
                        category.price,
                        category.time
                      )
                    }
                    className={`border-2 p-6 rounded-2xl cursor-pointer transition-all duration-200 shadow-lg hover:shadow-primary-400 hover:scale-105 hover:bg-primary-100/60 dark:hover:bg-primary-900/30 min-w-[120px] inline-flex items-center justify-center
                      ${
                        selectedCategory === category._id
                          ? "bg-primary-300 text-primary-800 border-primary-800"
                          : "bg-white dark:bg-gray-700 text-dark-600 dark:text-gray-200 border-gray-200 dark:border-gray-600"
                      }
                    `}
                  >
                    <p className="text-xl md:text-2xl font-bold text-center px-2">
                      {category.serviceProviderType}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-10">
              <h2 className="font-bold text-2xl md:text-3xl text-primary-600 dark:text-primary-400 mb-4">
                Select Date
              </h2>
              <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-5 w-full">
                {timeSlot.map((item, index) => (
                  <div
                    onClick={() => handleDateClick(index)}
                    className={`mb-4 text-center text-lg font-semibold py-6 min-w-32 rounded-2xl cursor-pointer border shadow-lg transition-all duration-200 hover:shadow-primary-400 hover:scale-105
                      ${
                        slotIndex === index
                          ? "bg-primary-300 text-primary-800 border-primary-800"
                          : "bg-white dark:bg-gray-700 text-dark-600 dark:text-gray-200 border-gray-200 dark:border-gray-600"
                      }
                    `}
                    key={index}
                  >
                    <p className="text-base font-bold">
                      {item[0]?.dateTime &&
                        daysOfWeek[item[0].dateTime.getDay()]}
                    </p>
                    <p className="text-2xl">{item[0]?.dateTime.getDate()}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-2xl md:text-3xl text-primary-600 dark:text-primary-400 mb-4">
                Select Time
              </h2>
              <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-5 w-full">
                {timeSlot.length &&
                  selectedCategory &&
                  timeSlot[slotIndex]?.map((item, index) => (
                    <p
                      onClick={() => handleTimeClick(item.time)}
                      className={`py-3 rounded-full cursor-pointer text-center border shadow-lg transition-all duration-200 hover:shadow-primary-400 hover:scale-105
                        ${
                          item.time === slotTime
                            ? "bg-primary-300 text-primary-800 border-primary-800"
                            : "bg-white dark:bg-gray-700 text-dark-600 dark:text-gray-200 border-gray-200 dark:border-gray-600"
                        }
                        ${
                          !selectedCategory || slotIndex === null
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                      `}
                      key={index}
                    >
                      {item.time.toLowerCase()}
                    </p>
                  ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Appointment;

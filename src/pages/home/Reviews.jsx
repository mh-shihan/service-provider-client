import { useEffect, useState } from "react";

import quotation from "../../assets/icon/quotation .png";
import SectionTitle from "../../components/SectionTitle";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axiosPublic.get("reviews").then((res) => {
      setReviews(res.data);
    });
  }, [axiosPublic]);
  if (reviews.length === 0) {
    return (
      <div>
        <SectionTitle
          heading={"Reviews"}
          subHeading={"What Our Clients Say"}
        ></SectionTitle>

        <div className="lg:space-y-6 md:space-y-8 py-10 space-y-3 px-5 md:px-0">
          <div className="skeleton h-6 w-40 mx-auto"></div>
          <div className="skeleton h-16 w-16 mx-auto"></div>
          <div className="skeleton h-20 w-full lg:w-3/5 md:w-4/5 mx-auto"></div>
          <div className="skeleton h-8 w-32 mx-auto"></div>
        </div>
      </div>
    );
  }
  return (
    <section>
      <SectionTitle
        heading={"Reviews"}
        subHeading={"What Our Clients Say"}
      ></SectionTitle>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className=" lg:space-y-6 md:space-y-8 py-10 space-y-3 px-5 md:px-0 dark:bg-gray-800 rounded-xl">
              <Rating
                className="mx-auto"
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <img
                className="h-16 text-center mx-auto"
                src={quotation}
                alt=""
              />
              <p className="text-center lg:px-32 md:px-16 px-5  space-y-5 dark:text-white">
                {review.details}
              </p>
              <h3 className="text-center text-primary-600 text-3xl">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;

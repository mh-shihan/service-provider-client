// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";

const Categories = () => {
  const [categories] = useCategories();

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100/60 w-full">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <SectionTitle
            heading={"All categories"}
            subHeading={"Explore more"}
          />
        </div>
        <Swiper
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3.5 },
          }}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination]}
          className="mySwiper pb-8"
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id} className="group cursor-pointer">
              <Link
                to={`/ourServices/${category.serviceProviderType}`}
                className="block h-full"
              >
                <div className="relative h-52 md:h-72 lg:h-96 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl bg-white">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={category.serviceImg}
                    alt={category.serviceProviderType}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10 transition-opacity duration-300 group-hover:bg-black/60" />
                  <h3 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-white text-center z-20 drop-shadow-lg tracking-wide px-2">
                    {category.serviceProviderType}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center mt-10">
          <Link
            to="/ourServices"
            className="btn bg-transparent border-1 border-b-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 text-lg"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;

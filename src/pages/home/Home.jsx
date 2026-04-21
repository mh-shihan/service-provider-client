import SectionBanner from "../../components/SectionBanner";
import Banner from "./Banner";
import Categories from "./Categories";
import PopularServicesProviders from "./PopularServicesProviders";
// import Featured from "./Featured";
import Reviews from "./Reviews";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const title = "Service Provider";
  const descriptions =
    "We’re not just another service provider—we’re your partner in making things easier. Whether you need a helping hand or a smart solution, we’re here to support you every step of the way. Our team is built on a foundation of trust, innovation, and a genuine desire to improve the way people get things done.";
  return (
    <div className="pt-5 max-w-[95%] lg:max-w-[90%] mx-auto">
      <Helmet>
        <title>Service Provider</title>
      </Helmet>
      <Banner></Banner>
      <Categories></Categories>
      <SectionBanner
        img="https://res.cloudinary.com/dipwayvsu/image/upload/v1752424089/qssw8yvorfmhnynnbphi.avif"
        title={title}
        descriptions={descriptions}
      ></SectionBanner>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            navigate("/about"), scrollTo(0, 0);
          }}
          className="btn bg-transparent border-1 border-b-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 text-lg"
        >
          More about us
        </button>
      </div>

      <PopularServicesProviders></PopularServicesProviders>
      {/* <Featured></Featured> */}
      {/* TODO: filter the reviews according to the rating(star) */}
      <Reviews></Reviews>
    </div>
  );
};

export default Home;

import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import cancelImg from "../../assets/services/cancel.png";

const Cancel = () => {
  return (
    <div className="pt-20 min-h-screen md:space-y-20">
      <Link to="/">
        <button className="flex items-center gap-2 mx-auto mt-20 font-rancho font-bold text-3xl text-primary-2">
          <IoArrowBack /> Back to home
        </button>
      </Link>
      <img className="mx-auto" src={cancelImg} alt="" />
      <p className="text-center text-2xl font-bold text-red-600">
        Payment Failed
      </p>{" "}
    </div>
  );
};

export default Cancel;

import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import successImg from "../../assets/services/success.png";

const Success = () => {
  return (
    <div className="pt-20 min-h-screen md:space-y-20">
      <Link to="/">
        <button className="flex items-center gap-2 mx-auto mt-20 font-rancho font-bold text-3xl">
          <IoArrowBack /> Back to home
        </button>
      </Link>

      <img className="mx-auto" src={successImg} alt="" />
      <p className="text-center text-2xl font-bold text-green-500">
        Payment Success
      </p>
    </div>
  );
};

export default Success;

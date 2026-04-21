import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivetRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div>
        <Loading></Loading>
      </div>
    );

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ form: location }} replace></Navigate>;
};

export default PrivetRoute;

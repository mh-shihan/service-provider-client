import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import useProvider from "../hooks/useProvider";

const ProviderRoute = ({ children }) => {
  const [isProvider, isProviderLoading] = useProvider();
  const { user, loading,logOut } = useAuth();
  const location = useLocation();

  if (loading || isProviderLoading) {
    return <Loading />;
  }

  if (user && isProvider) {
    return children;
  }
  if (user && !isProvider) {
    logOut();
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProviderRoute;

import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading,logOut } = useAuth();
  const location = useLocation();

  if (isAdminLoading || loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
if (user && !isAdmin) {
    logOut();
}
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;

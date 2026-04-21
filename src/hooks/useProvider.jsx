import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useProvider = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isProvider, isPending: isProviderLoading } = useQuery({
    queryKey: [user?.email, "isProvider"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/provider/${user.email}`);
      return res.data?.provider;
    },
  });
  return [isProvider, isProviderLoading];
};
export default useProvider;

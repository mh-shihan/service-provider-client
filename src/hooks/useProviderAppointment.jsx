import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useProviderAppointment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: providerAppointments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignAppointments/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // console.log("User email:", user?.email);
  // console.log("Fetched provider appointments:", providerAppointments);

  return [providerAppointments, refetch, isLoading];
};

export default useProviderAppointment;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAppointment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: appointment = [], refetch } = useQuery({
    queryKey: ["appointment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments?email=${user.email}`);
      return res.data;
    },
  });
  return [appointment, refetch];
};

export default useAppointment;

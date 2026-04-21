import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAppointments = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allAppointments = [], refetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allAppointments`);
      return res.data;
    },
  });
  return [allAppointments, refetch];
};
export default useAppointments;

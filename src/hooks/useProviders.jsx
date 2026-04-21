import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useProviders = () => {
  const [providers, setProviders] = useState([]);
  const [providersLoading, setProvidersLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    // TODO: check the url
    axiosPublic.get("providers").then((res) => {
      setProviders(res.data);
      setProvidersLoading(false);
    });
  }, [axiosPublic]);
  return [providers, providersLoading];
};

export default useProviders;

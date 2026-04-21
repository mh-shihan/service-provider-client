import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("categories")
      .then((res) => {
        setCategories(res.data);
        setCategoriesLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategoriesLoading(false);
      });
  }, [axiosPublic]);

  return [categories, categoriesLoading];
};

export default useCategories;

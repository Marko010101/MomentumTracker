import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../services/api.js";

export function useDepartments() {
  const {
    data: departments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  return { departments, isLoading, error };
}

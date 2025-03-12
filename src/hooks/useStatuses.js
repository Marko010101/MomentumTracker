import { useQuery } from "@tanstack/react-query";
import { getStatuses } from "../services/api.js";

export function useStatuses() {
  const {
    data: statuses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });

  return { statuses, isLoading, error };
}

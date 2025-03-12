import { useQuery } from "@tanstack/react-query";
import { getPriorities } from "../services/api.js";

export function usePriorities() {
  const {
    data: priorities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["priorities"],
    queryFn: getPriorities,
  });

  return { priorities, isLoading, error };
}

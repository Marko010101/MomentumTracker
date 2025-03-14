import { useQuery } from "@tanstack/react-query";
import { getTask } from "../services/api.js";

export function useTask(id) {
  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
    enabled: !!id,
    retry: 2,
  });

  return { task, isLoading, error };
}

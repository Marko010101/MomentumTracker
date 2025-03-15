import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/api.js";

export function useComments(id) {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
    enabled: !!id,
    retry: 2,
  });

  return { comments, isLoading, error };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../services/api.js";

export function useCreateComment() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, text, parent_id }) => createComment(id, text, parent_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return { mutate, isPending, error };
}

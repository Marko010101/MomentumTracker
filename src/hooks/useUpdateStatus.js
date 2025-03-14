import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../services/api.js";

export function useUpdateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }) => updateStatus(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      console.error("Failed to update status:", error.message);
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../services/api.js";

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => createTask(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      console.error("Error creating task:", error.message);
    },
  });
}

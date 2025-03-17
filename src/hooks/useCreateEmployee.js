import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../services/api.js";

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => createEmployee(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["employees"]);
    },
    onError: (error) => {
      console.error("Error creating employee:", error.message);
    },
  });
}

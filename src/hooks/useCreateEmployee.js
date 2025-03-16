import { useMutation } from "@tanstack/react-query";
import { createEmployee } from "../services/api.js";

export function useCreateEmployee() {
  return useMutation({
    mutationFn: (formData) => createEmployee(formData),
    onSuccess: (data) => {
      console.log("Employee created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating employee:", error.message);
    },
  });
}

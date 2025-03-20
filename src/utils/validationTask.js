import { validationTextTask } from "../constants/validationTextTask.js";

export const validationTask = (field, value) => {
  if (field === "name") {
    const validationText = validationTextTask[field];
    const trimmedValue = value.trim();

    if (trimmedValue.length < 3) return validationText[0];
    if (trimmedValue.length > 255) return validationText[1];

    return "";
  }

  if (field === "description") {
    const validationDescription = validationTextTask[field];

    if (value.length === 0) return "";

    const wordCount = value.trim().split(/\s+/).length;

    if (wordCount < 4) return validationDescription[0];
    if (value.trim().length > 255) return validationDescription[1];

    return "";
  }

  if (field === "department") {
    if (!value) return validationTextTask.department;
    return "";
  }
  if (field === "employee") {
    if (!value) return validationTextTask.employee;
    return "";
  }

  return "";
};

import { errorText } from "../constants/errorText.js";
import { validationTextEmployee } from "../constants/validationTextEmployee.js";

export const validateInputEmployee = (name, value) => {
  if (name === "name" || name === "surname") {
    if (!value.trim()) return validationTextEmployee.name;
    if (value.length < 2) return errorText;

    return;
  }

  if (name === "email") {
    if (!value.trim()) return validationTextEmployee.email;
    if (!/^.+@redberry\.ge$/.test(value)) return errorText;

    return;
  }

  if (name === "avatar") {
    if (!value) return validationTextEmployee.avatar;
    if (value.size > 1024 * 1024) return "ფაილის ზომა არუნდა აღემატებოდეს 1MB";

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/avif"];
    if (!allowedTypes.includes(value.type)) return "ფაილის ფორმატი უნდა იყოს .png, .jpg, ან .jpeg";

    return;
  }

  return "";
};

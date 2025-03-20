import { validationTextEmployee } from "../constants/validationTextEmployee.js";

export const isRuleValid = (rule, value) => {
  if (rule === "მინიმუმ 2 სიმბოლო") return value.length >= 2;
  if (rule === "მაქსიმუმ 255 სიმბოლო") return value.length <= 255;

  return false;
};

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/x-icon",
  "image/svg+xml",
  "image/heif",
  "image/heic",
  "image/vnd.microsoft.icon",
  "image/jp2",
];

const MAX_FILE_SIZE = 1024 * 600;

const isNameValid = (value) => /^[a-zA-Zა-ჰ\s]+$/.test(value);

export const validationEmployee = (field, value) => {
  if (field === "name" || field === "surname") {
    const validationText = validationTextEmployee[field];
    const trimmedValue = value.trim();

    if (trimmedValue.length < 2) return validationText[0];
    if (trimmedValue.length > 255) return validationText[1];
    if (!isNameValid(trimmedValue)) return validationText[2];

    return "";
  }

  if (field === "avatar") {
    if (!value) return validationTextEmployee.avatar;
    if (value.size > MAX_FILE_SIZE) return validationTextEmployee.size;
    if (!ALLOWED_IMAGE_TYPES.includes(value.type))
      return "ფაილის ფორმატი უნდა იყოს სურათის ფორმატი (PNG, JPG, JPEG, WEBP, AVIF და სხვ.)";

    return "";
  }

  if (field === "department") {
    if (!value) return validationTextEmployee.departmentRequired;
    return "";
  }

  return ""; // Default case
};

export const fixedDepartmentName = (departmentName) => {
  let nameParts = departmentName.split(" ");
  let fixedName = nameParts.slice(0, -1).join(" ");

  if (fixedName.endsWith("ს")) {
    fixedName = fixedName.slice(0, -1);
  }

  const corrections = {
    ადმინისტრაციი: "ადმინისტრაცია",
    ლოჯოსტიკი: "ლოჯოსტიკა",
    მედიი: "მედია",
  };

  return corrections[fixedName] || fixedName;
};

export const formatDate = (timestamp) => {
  const months = ["იანვ", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];

  // Ensure timestamp is in a valid format
  const date = new Date(timestamp);
  if (isNaN(date)) return "Invalid Date";

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
};

export const getPriorityColor = (priorityName) => {
  switch (priorityName) {
    case "მაღალი":
      return "var(--color-red)";
    case "საშუალო":
      return "var(--color-yellow-golden)";
    case "დაბალი":
      return "var(--color-green)";
    default:
      return "var(--color-text)";
  }
};

export const getDepartmentColor = (department) => {
  switch (department) {
    case "ადმინისტრაციის დეპარტამენტი":
      return "var(--color-blue-light)";
    case "ადამიანური რესურსების დეპარტამენტი":
      return "var(--color-green-light)";
    case "ფინანსების დეპარტამენტი":
      return "var(--color-orange-light)";
    case "გაყიდვები და მარკეტინგის დეპარტამენტი":
      return "var(--color-purple)";
    case "ლოჯოსტიკის დეპარტამენტი":
      return "var(--color-blue-dark)";
    case "ტექნოლოგიების დეპარტამენტი":
      return "var(--color-teal)";
    case "მედიის დეპარტამენტი":
      return "var(--color-yellow)";
    default:
      return "var(--color-text)";
  }
};

export const truncateString = (str) => {
  if (str.length > 100) {
    return str.slice(0, 100) + "...";
  }
  return str;
};

export const fixedDepartmentName = (departmentName) => {
  let nameParts = departmentName.split(" ");
  let fixedName = nameParts.slice(0, -1).join(" ");

  if (fixedName.endsWith("ს")) {
    fixedName = fixedName.slice(0, -1);
  }

  const corrections = {
    ადმინისტრაციი: "ადმინისტრაცია",
    ლოჯოსტიკი: "ლოჯისტიკა",
    მედიი: "მედია",
  };

  return corrections[fixedName] || fixedName;
};

export const formatDateToMonth = (timestamp) => {
  const months = ["იანვ", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];

  const date = new Date(timestamp);
  if (isNaN(date)) return "Invalid Date";

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
};

export function formatDateToWeekday(timestamp) {
  const days = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];

  const date = new Date(timestamp);
  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${dayOfWeek} - ${day}/${month}/${year}`;
}

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
    case "ლოჯისტიკის დეპარტამენტი":
      return "var(--color-blue-dark)";
    case "ტექნოლოგიების დეპარტამენტი":
      return "var(--color-teal)";
    case "მედიის დეპარტამენტი":
      return "var(--color-yellow)";
    default:
      return "var(--color-purple)";
  }
};

export const truncateString = (str) => {
  if (str?.length > 100) {
    return str?.slice(0, 100) + "...";
  }
  return str;
};

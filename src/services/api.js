import { API_URL } from "../constants/API_URL.js";

export async function getStatuses() {
  try {
    const response = await fetch(`${API_URL}/statuses`);

    if (!response.ok) {
      throw new Error(`Could not load Statuses, status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
}

export async function getPriorities() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const response = await fetch(`${API_URL}/priorities`);

    if (!response.ok) {
      throw new Error(`Could not load Priorities, status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
}

export async function getDepartments() {
  try {
    const response = await fetch(`${API_URL}/departments`);

    if (!response.ok) {
      throw new Error(`Could not load departments, status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
}

export async function getEmployees() {
  try {
    const response = await fetch(`${API_URL}/employees`, {
      headers: { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error(`Could not load departments, status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
}
export async function getTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error(`Could not load tasks, status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
}

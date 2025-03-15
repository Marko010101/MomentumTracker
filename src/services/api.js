import { API_URL } from "../constants/API_URL.js";

export async function getStatuses() {
  const response = await fetch(`${API_URL}/statuses`);

  if (!response.ok) {
    throw new Error(`Could not load Statuses, status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function updateStatus(id, body) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Could not update status, status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getPriorities() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(`${API_URL}/priorities`);

  if (!response.ok) {
    throw new Error(`Could not load Priorities, status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function getDepartments() {
  const response = await fetch(`${API_URL}/departments`);

  if (!response.ok) {
    throw new Error(`Could not load departments, status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function getEmployees() {
  const response = await fetch(`${API_URL}/employees`, {
    headers: { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
  });

  if (!response.ok) {
    throw new Error(`Could not load departments, status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
  });

  if (!response.ok) {
    throw new Error(`Could not load tasks, status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function getTask(id) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    headers: { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
  });

  if (!response.ok) {
    throw new Error(`Could not load task, status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function getComments(id) {
  const response = await fetch(`${API_URL}/tasks/${id}/comments`, {
    headers: { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
  });

  if (!response.ok) {
    throw new Error(`Could not load comments, status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function createComment(id, text, parent_id = null) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(`${API_URL}/tasks/${id}/comments`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({ text, parent_id }),
  });

  if (!response.ok) {
    throw new Error(`Could not create comment, status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

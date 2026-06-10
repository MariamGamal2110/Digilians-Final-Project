import { apiRequest } from "./client";

export async function getAllPunishments() {
  const data = await apiRequest("/punishments", { method: "GET" }, "admin");
  return data.punishments || [];
}

export async function createPunishment(record) {
  const data = await apiRequest("/punishments", {
    method: "POST",
    body: JSON.stringify(record),
  }, "admin");
  return data.punishment;
}

export async function updatePunishment(id, record) {
  const data = await apiRequest(`/punishments/${id}`, {
    method: "PUT",
    body: JSON.stringify(record),
  }, "admin");
  return data.punishment;
}

export async function deletePunishment(id) {
  await apiRequest(`/punishments/${id}`, { method: "DELETE" }, "admin");
}

export async function searchStudentPunishments(militaryNum, studentName = "") {
  const params = new URLSearchParams({ militaryNum, studentName });
  const data = await apiRequest(`/punishments/student?${params.toString()}`, { method: "GET" }, "user");
  return data;
}

import axios from "axios";

const API = "http://localhost:5500/employees";

export async function getEmployees() {
  const response = await axios.get(API);
  return response.data;
}

export async function addEmployee(data) {
  const response = await axios.post(API, data);
  return response.data;
}

export async function updateEmployee(id, data) {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
}

export async function deleteEmployee(id) {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
}

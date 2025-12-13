const API = "http://localhost:5500/employees";

export async function getEmployees() {
  const r = await fetch(API);
  return r.json();
}

export async function addEmployee(data) {
  const r = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return r.json();
}

export async function updateEmployee(id, data) {
  const r = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return r.json();
}

export async function deleteEmployee(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
}

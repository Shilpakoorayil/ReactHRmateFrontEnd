import React, { useContext, useEffect, useState } from "react";
import "../style.css";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { AuthContext } from "../context/AuthContext";

export default function Teams() {
  const { user } = useContext(AuthContext);

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("all");
  const [loading, setLoading] = useState(true);

  // 🔹 Load employees
  useEffect(() => {
    if (!user) return;

    let url = "http://localhost:5500/employees";

    if (user.role === "hr") {
      url += `?department=${user.department}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setFilteredEmployees(data);

        const uniqueDepts = [...new Set(data.map((e) => e.department))];
        setDepartments(uniqueDepts);
      })
      .catch((err) => console.error("Error loading teams:", err))
      .finally(() => setLoading(false));
  }, [user]);

  // 🔹 Handle filter
  const handleFilter = (dept) => {
    setSelectedDept(dept);
    setFilteredEmployees(
      dept === "all"
        ? employees
        : employees.filter((e) => e.department === dept)
    );
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar />

        <section className="teams-page">
          <div className="teams-header">
            <h1 className="page-title">
              Team Members ({filteredEmployees.length})
            </h1>

            {user?.role === "admin" && (
          <select
  className="filter-select"
  value={selectedDept}
  onChange={(e) => handleFilter(e.target.value)}
>
  <option value="all">All Departments</option>
  <option value="HR">HR</option>
  <option value="IT">IT</option>
  <option value="Finance">FINANCE</option>
  <option value="Marketing">MARKETING</option> 
  <option value="Operations">OPERATIONS</option>

</select>

            )}
          </div>

          {loading && <p>Loading team members...</p>}

          {!loading && filteredEmployees.length === 0 && (
            <p className="empty">No team members found.</p>
          )}

          {!loading && filteredEmployees.length > 0 && (
            <table className="team-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="user-cell">
                        <img
                          src={
                            emp.image ||
                            `https://i.pravatar.cc/40?u=${emp.email}`
                          }
                          alt={emp.name}
                        />
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

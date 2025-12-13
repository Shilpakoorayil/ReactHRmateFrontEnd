import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { AuthContext } from "../context/AuthContext";
import '../style.css';

export default function Teams() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let url = "http://localhost:5500/employees";

    // HR sees only their own department
    if (user.role === "hr") {
      url = `http://localhost:5500/employees?department=${user.department}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setFilteredEmployees(data);
        setLoading(false);

        // Extract unique departments
        const deptList = [...new Set(data.map((e) => e.department))];
        setDepartments(deptList);
      });
  }, [user]);

  // ⭐ FILTER HANDLER
  const handleFilter = (dept) => {
    setSelectedDept(dept);

    if (dept === "all") {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(employees.filter((e) => e.department === dept));
    }
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

            {/* ⭐ FILTER DROPDOWN */}
            {user.role === "admin" && (
              <select
                className="filter-select"
                value={selectedDept}
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
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
                  {/* <th>Phone</th> */}
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
                            emp.image
                              ? emp.image
                              : `https://i.pravatar.cc/40?u=${emp.email}`
                          }
                          alt={emp.name}
                        />
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    <td>{emp.email}</td>
                    {/* <td>{emp.phone}</td> */}
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

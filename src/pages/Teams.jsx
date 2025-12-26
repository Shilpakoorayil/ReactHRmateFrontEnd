import React, { useContext, useEffect, useState } from "react";
import "./Team.css";
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

    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const paginatedList = filteredEmployees.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const changePage = (num) => setCurrentPage(num);


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
  <div className="team-grid">
    {paginatedList.map((emp) => (
      <div className="team-card" key={emp.id}>
        <img
          src={emp.image || `https://i.pravatar.cc/100?u=${emp.email}`}
          alt={emp.name}
        />

        <h4>{emp.name}</h4>
        <p>{emp.email}</p>
        <p><strong>{emp.department}</strong></p>
        <p>{emp.designation}</p>
      </div>
    ))}
  </div>
  
  
)}
{totalPages > 1 && (
  <div className="pagination">
    <button
      className="page-btn"
      disabled={currentPage === 1}
      onClick={() => changePage(currentPage - 1)}
    >
      Prev
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        className={`page-btn ${currentPage === index + 5 ? "active" : ""}`}
        onClick={() => changePage(index + 1)}
      >
        {index + 1}
      </button>
    ))}

    <button
      className="page-btn"
      disabled={currentPage === totalPages}
      onClick={() => changePage(currentPage + 1)}
    >
      Next
    </button>
  </div>
)}


        </section>
      </div>
    </div>
  );
}

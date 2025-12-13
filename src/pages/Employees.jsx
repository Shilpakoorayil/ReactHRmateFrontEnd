import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/employeesApi";
import '../style.css';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5; // rows per page

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    const data = await getEmployees();
    setEmployees(data);
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this employee?")) {
      await deleteEmployee(id);
      loadEmployees();
    }
  }

  // SEARCH FILTER
  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="card">
          <h3>Employees</h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Search Employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            <Link to="/add-employee" className="btn primary">
              + Add Employee
            </Link>
          </div>

          <table className="table employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>

                  {/* DEPARTMENT */}
                  <td>
                    <span className="badge dept-badge">{e.department}</span>
                  </td>

                  {/* DESIGNATION */}
                  <td>{e.designation}</td>

                  <td>
                    <Link to={`/edit-employee/${e.id}`} className="edit-link">
                      Edit
                    </Link>{" "}
                    |{" "}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION BUTTONS */}
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`page-btn ${page === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

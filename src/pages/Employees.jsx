import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import Topbar from "../components/admin/Topbar";
import { Link } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/employeesApi";

import Sidebar from "../components/admin/Sidebar";
import './empllist.css'

export default function Employees() {
  const { user } = useContext(AuthContext);

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5; // rows per page

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc


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

  const sortEmployees = (list) => {
    return [...list].sort((a, b) => {
      const valueA = a[sortField]?.toLowerCase();
      const valueB = b[sortField]?.toLowerCase();

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };
  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * limit;
  const sorted = sortEmployees(filtered);
  const paginated = sorted.slice(start, start + limit);

  const totalPages = Math.ceil(filtered.length / limit);
  // .............................................



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
            {user?.role === "admin" && (
              <Link to="/add-employee" className="btn primary">
                + Add Employee
              </Link>
            )}


          </div>

          <table className="table employee-table">
            <thead>
              <tr>
                {/* ..........Name............................ */}
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (sortField === "name") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortField("name");
                      setSortOrder("asc");
                    }
                    setPage(1);
                  }}
                >
                  Name {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                {/* ........................................... */}
                <th>Email</th>
                {/* ...................................... */}
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (sortField === "department") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortField("department");
                      setSortOrder("asc");
                    }
                    setPage(1);
                  }}
                >
                  Department {sortField === "department" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                {/* ....................Designation,,,,,,,,,,,,,,,,,,,,,,,,, */}

                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (sortField === "designation") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortField("designation");
                      setSortOrder("asc");
                    }
                    setPage(1);
                  }}
                >
                  Designation {sortField === "designation" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                {/* ............................................... */}
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

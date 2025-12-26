import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { AuthContext } from "../context/AuthContext";
import "./empllist.css";

export default function AddEmployee() {
  const { dark } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
    joinDate: "",
    isNew: true,
    resigned: false,
  });

  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name is required";
    else if (!/^[A-Za-z ]+$/.test(form.name))
      err.name = "Only alphabets allowed";

    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Invalid email format";

    if (!form.designation) err.designation = "Select a designation";
    if (!form.department) err.department = "Select a department";

    if (!form.joinDate) err.joinDate = "Select employee join date";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const save = async () => {
    if (!validate()) return;

    await fetch("http://localhost:5500/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    nav("/employees");
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar />
        <br />
        <Link to="/employees" className="btn primary">
          Back
        </Link>

        <div className="center">
          <div className="card small">
            <h3 className="addEmp">Add Employee</h3>

            {/* NAME */}
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="error-text">{errors.name}</p>
            )}

            {/* EMAIL */}
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="error-text">{errors.email}</p>
            )}

            {/* DESIGNATION */}
            <select
              value={form.designation}
              onChange={(e) =>
                setForm({ ...form, designation: e.target.value })
              }
            >
              <option value="">Select Designation</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Accountant">Accountant</option>
              <option value="Intern">Intern</option>
            </select>
            {errors.designation && (
              <p className="error-text">{errors.designation}</p>
            )}

            {/* DEPARTMENT */}
            <select
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
             
            </select>
            {errors.department && (
              <p className="error-text">{errors.department}</p>
            )}

            {/* JOIN DATE (Disable Old Dates) */}
            <input
              type="date"
              value={form.joinDate}
              min={today}
              onChange={(e) =>
                setForm({ ...form, joinDate: e.target.value })
              }
            />
            {errors.joinDate && (
              <p className="error-text">{errors.joinDate}</p>
            )}

            <button className="btn primary" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

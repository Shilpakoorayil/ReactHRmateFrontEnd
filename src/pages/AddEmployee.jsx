import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { AuthContext } from "../context/AuthContext";
import { addEmployee } from "../api/employeesApi"; // <-- Import axios function
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

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!form.designation) err.designation = "Select a designation";
    if (!form.department) err.department = "Select a department";
    if (!form.joinDate) err.joinDate = "Select employee join date";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      await addEmployee(form);
      alert("Employee added successfully! 👌");
      nav("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Something went wrong!");
    }
  }

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

            <form onSubmit={handleSubmit} className="form">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <select
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
              >
                <option value="">Select Designation</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Accountant">Accountant</option>
                <option value="Intern">Intern</option>
              </select>
              {errors.designation && <p className="error-text">{errors.designation}</p>}

              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </select>
              {errors.department && <p className="error-text">{errors.department}</p>}

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

              <button type="submit" className="btn primary">
                Save
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

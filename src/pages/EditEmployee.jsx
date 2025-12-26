import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { updateEmployee, getEmployees } from "../api/employeesApi";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Emp.css";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
    joinDate: ""
  });

  const [errors, setErrors] = useState({});
  const DesignationArray = ["Admin", "HR", "Manager", "Employee"];
  const DepartmentArray = ["HR", "IT", "Finance", "Marketing"];
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadEmployee();
  }, []);

  async function loadEmployee() {
    const list = await getEmployees();
    const emp = list.find((e) => e.id == id);
    if (emp) setForm(emp);
  }

  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name is required";
    else if (!/^[A-Za-z ]+$/.test(form.name))
      err.name = "Only alphabets allowed";

 if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Invalid email format";

    if (!form.department) err.department = "Select a department";
    if (!form.designation) err.designation = "Select a designation";
    if (!form.joinDate) err.joinDate = "Select a date";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    await updateEmployee(id, form);
    navigate("/employees");
  }

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Topbar />
        <br />
        <Link to="/employees" className="btn primary">Back</Link>

        <div className="center">
          <div className="card small">
            <h2>Edit Employee</h2>

            <form onSubmit={handleSubmit} className="form">

              <input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
              />
              {errors.name && <p className="error-text">{errors.name}</p>}

              <input
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <select
                name="department"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              >
                <option value="">Department</option>
                {DepartmentArray.map((dep) => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
              {errors.department && <p className="error-text">{errors.department}</p>}

              <select
                name="designation"
                value={form.designation}
                onChange={(e) =>
                  setForm({ ...form, designation: e.target.value })
                }
              >
                <option value="">Designation</option>
                {DesignationArray.map((des) => (
                  <option key={des} value={des}>{des}</option>
                ))}
              </select>
              {errors.designation && <p className="error-text">{errors.designation}</p>}

              {/* Disable Old Dates */}
              <input
                type="date"
                name="joinDate"
                value={form.joinDate}
                min={today}
                onChange={(e) => setForm({ ...form, joinDate: e.target.value })}
              />
              {errors.joinDate && <p className="error-text">{errors.joinDate}</p>}

              <button type="submit" className="btn">Update Employee</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

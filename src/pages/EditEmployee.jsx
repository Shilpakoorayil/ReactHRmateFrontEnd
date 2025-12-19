import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { updateEmployee, getEmployees } from "../api/employeesApi";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../style.css';

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const DesignationArray = ["Admin", "HR", "Manager", "Employee"];
  const DepartmentArray = ["HR", "IT", "Finance", "Marketing", "Operations"];


  useEffect(() => {
    loadEmployee();
  }, []);

  async function loadEmployee() {
    const list = await getEmployees();
    const emp = list.find((e) => e.id == id);
    if (emp) setForm(emp);
  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  async function handleSubmit(e) {
    e.preventDefault();
    await updateEmployee(id, form);
    navigate("/employees");
  }

  return (
    <div className="app">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="main">
        {/* TOP BAR */}
        <Topbar />
        <br />
        <Link to="/employees" className="btn primary">
                                   Back
                                 </Link>

        {/* PAGE CONTENT */}
        <div className='center'>
          <div className='card small'>
            {/* <div className="card form-card"> */}
            <h2>Edit Employee</h2>

            <form onSubmit={handleSubmit} className="form">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              {/* Departments */}
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
              >
                <option value="">Department</option>

                {DepartmentArray.map(role => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {/* Designations */}
              <select
                name="designation"
                value={form.designation}
                onChange={handleChange}
                required
              >
                <option value="">Designation</option>

                {DesignationArray.map(role => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>



              <button type="submit" className="btn">
                Update Employee
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>);
}

import React, { useContext, useEffect, useState } from "react";
import EmpSidebar from "../../components/employee/empSidebar";
import Topbar from "../../components/admin/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const { user } = useContext(AuthContext);
  const [employee, setEmployee] = useState(null);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5500/employees/${user.employeeId}`)
      .then(res => res.json())
      .then(data => setEmployee(data))
      .catch(err => console.error(err));
  }, [user]);

  // ........................................Leave Details................
useEffect(() => {
  if (!user) return;

  fetch(`http://localhost:5500/employeeId/${user.id}`)
    .then(res => res.json())
    .then(data => setEmployee(data));
}, [user]);

useEffect(() => {
  if (!user) return;

  fetch(`http://localhost:5500/leaves?employeeId=${user.id}`)
    .then(r => r.json())
    .then(setLeaves);
}, [user]);

const pending = leaves.filter(l => l.status?.toLowerCase() === "pending").length;
const approved = leaves.filter(l => l.status?.toLowerCase() === "approved").length;
const rejected = leaves.filter(l => l.status?.toLowerCase() === "rejected").length;


  if (!employee) return <p>Loading...</p>;

  return (
    <div className="app">
      <EmpSidebar />
      <div className="main">
        <Topbar />

        
        {/* .......................Leave Details..................................... */}
        <div className="dashboard">
          <h2>Welcome Back , {user.name}</h2>
          <h3>My Dashboard</h3>

          <div className="card-grid">
            <div className="dash-card pending">
              <h3>{pending}</h3>
              <p>Pending Leaves</p>
            </div>

            <div className="dash-card approved">
              <h3>{approved}</h3>
              <p>Approved Leaves</p>
            </div>

            <div className="dash-card rejected">
              <h3>{rejected}</h3>
              <p>Rejected Leaves</p>
            </div>
          </div>
      



<br />

        {/* .....................Employee Profile Details................*/}
        <div className="employee-grid">
          <div className="employee-card">
            <img
              src={employee.image || `https://i.pravatar.cc/150?u=${employee.email}`}
              alt="profile"
            />

            <h2>{employee.name}</h2>
            <p><b>Email:</b> {employee.email}</p>
            <p><b>Role:</b> {employee.role}</p>
            <p><b>Department:</b> {employee.department}</p>
            <p><b>Phone:</b> {employee.phone}</p>
            <p><b>designation:</b> {employee.designation}</p>
            <p><b>salary:</b> {employee.salary}</p>
            <p><b>joinDate:</b> {employee.joinDate}</p>
            <p><b>status:</b> {employee.status}</p>


          </div>
        </div>
        {/* ............................................. */}


  </div>
      </div>
    </div>
  );
}
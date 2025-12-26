import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import EmpSidebar from "../../components/employee/empSidebar";
import Topbar from "../../components/admin/Topbar";
import "./EmployeePayroll.css";

export default function EmployeePayroll() {
  const { user } = useContext(AuthContext);
  const [payroll, setPayroll] = useState([]);

  useEffect(() => {
    if (!user) return;
    
  

    fetch(`http://localhost:5500/payroll?employeeId=${user.employeeId}`)
      .then(res => res.json())
      .then(data => setPayroll(data));
  }, [user]);

  return (
    <div className="app">
      <EmpSidebar />

      <div className="main">
        <Topbar />

       <div className="table-wrapper">
  <table className="table">
    <thead>
      <tr>
        <th>Month</th>
        <th>Year</th>
        <th>Net Salary</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {payroll.map(p => (
        <tr key={p.id}>
          <td data-label="Month">{p.month}</td>
          <td data-label="Year">{p.year}</td>
          <td data-label="Net Salary">₹{p.netSalary}</td>
          <td data-label="Status">
            <span
              className={p.status === "Approved" ? "approved" : "pending"}
            >
              {p.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
}

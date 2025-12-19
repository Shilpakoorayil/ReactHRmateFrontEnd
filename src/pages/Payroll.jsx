import React, { useEffect, useState } from "react";

import Topbar from "../components/admin/Topbar";
import Sidebar from "../components/admin/Sidebar";
import './Payroll.css';

export default function Payroll() {
  const [payroll, setPayroll] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const p = await fetch("http://localhost:5500/payroll").then(r => r.json());
    const e = await fetch("http://localhost:5500/employees").then(r => r.json());
    setPayroll(p);
    setEmployees(e);
  };

  const getEmployeeName = (id) => {
    const emp = employees.find(e => Number(e.id) === Number(id));
    return emp ? emp.name : "Unknown";
  };
  const updateStatus = async (id, newStatus) => {
  await fetch(`http://localhost:5500/payroll/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: newStatus })
  });

  loadData(); // refresh table
};


  return (
    <div className="app">
      <Sidebar/>
      <div className="main">
        <Topbar />

        <div className="card">
          <h3>Payroll</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Month</th>
                <th>Basic</th>
                <th>HRA</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Status</th>
<th>Action</th>

              </tr>
            </thead>

            <tbody>
              {payroll.map(p => (
                <tr key={p.id}>
                  <td>{getEmployeeName(p.employeeId)}</td>
                  <td>{p.month} {p.year}</td>
                  <td>₹{p.basic}</td>
                  <td>₹{p.hra}</td>
                  <td>₹{p.deductions}</td>
                  <td><strong>₹{p.netSalary}</strong></td>
                <td>
  <span
    className={`status ${
      p.status === "Approved" ? "present" : "absent"
    }`}
  >
    {p.status}
  </span>
</td>

<td>
  {p.status === "Pending" ? (
    <button
      className="btn-approve"
      onClick={() => updateStatus(p.id, "Approved")}
    >
      Approve
    </button>
  ) : (
    <button
      className="btn-pending"
      onClick={() => updateStatus(p.id, "Pending")}
    >
      Mark Pending
    </button>
  )}
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

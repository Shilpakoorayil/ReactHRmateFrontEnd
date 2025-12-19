import React, { useEffect, useState } from "react";
import Topbar from "../components/admin/Topbar";
import Sidebar from "../components/admin/Sidebar";
import "./Payroll.css";

export default function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedName, setSelectedName] = useState("all");
  
  // PAGINATION
    const [visibleCount, setVisibleCount] = useState(5);
      const [leaves, setLeaves] = useState([]);
      const currentMonth = new Date().toISOString().slice(0, 7); // "2025-09"
    
const [selectedMonth, setSelectedMonth] = useState(currentMonth);


  // LOAD DATA
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const p = await fetch("http://localhost:5500/payroll").then(r => r.json());
    const e = await fetch("http://localhost:5500/employees").then(r => r.json());
    setPayrolls(p);
    setEmployees(e);
  };

  // UPDATE STATUS
  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5500/payroll/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    loadData(); // refresh table after update
  };

 const filteredPayrolls = payrolls.filter(p => {
  const nameMatch =
    selectedName === "all" || p.name === selectedName;
  const monthMatch =
    selectedMonth === "all" || p.month === selectedMonth;
  return nameMatch && monthMatch;
});

const visiblePayrolls = filteredPayrolls.slice(0, visibleCount);


  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="card">
          <h3>Payroll</h3>

          {/* FILTERS */}
          <div className="filter-bar">
            <select onChange={e => setSelectedName(e.target.value)}>
              <option value="all">All Employees</option>
              {[...new Set(payrolls.map(p => p.name))].map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>

         <select
  value={selectedMonth}
  onChange={e => setSelectedMonth(e.target.value)}
>
  <option value="all">All Months</option>

  {[...new Set(payrolls.map(p => p.month))].map(month => (
    <option key={month} value={month}>
      {month}
    </option>
  ))}
</select>

          </div>

          {/* TABLE */}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Month</th>
                <th>Year</th>
                <th>Net Salary</th>
                <th>Status</th>
              </tr>
            </thead>
<tbody>
  {visiblePayrolls.map(p => (
    <tr key={p.id}>
      <td>{p.name}</td>
      <td>{p.month}</td>
      <td>{p.year}</td>
      <td>₹{p.netSalary}</td>
      <td>
        <select
          className={`status-select ${p.status}`}
          value={p.status}
          onChange={e => updateStatus(p.id, e.target.value)}
        >
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
        </select>
      </td>
    </tr>
  ))}
</tbody>

          </table>
           {/* PAGINATION */}
          {visibleCount < filteredPayrolls.length && (
  <div className="load-more">
    <button onClick={() => setVisibleCount(prev => prev + 5)}>
      Load More
    </button>
  </div>
)}



        </div>
      </div>
    </div>
  );
}

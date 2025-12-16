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

        <div className="card">
          <h3>My Payroll (Last Month)</h3>

          {payroll.length === 0 ? (
            <p>No payroll generated yet</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Present Days</th>
                  <th>Total Hours</th>
                  <th>Net Salary</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payroll.map(p => (
                  <tr key={p.id}>
                    <td>{p.month}</td>
                    <td>{p.presentDays}</td>
                    <td>{p.totalHours}</td>
                    <td>₹{p.netSalary}</td>
                    <td>
                      <span
                        className={
                          p.status === "Approved" ? "approved" : "pending"
                        }
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

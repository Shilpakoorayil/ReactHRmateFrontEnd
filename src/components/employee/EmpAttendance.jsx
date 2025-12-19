import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { AuthContext } from "../../context/AuthContext";
import EmpSidebar from "../../components/employee/empSidebar";
import Topbar from "../../components/admin/Topbar";
import "./EmpAttendance.css";

export default function EmployeeAttendance() {
  const { user } = useContext(AuthContext);

  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5500/attendance?employeeId=${user.id}`)
      .then(r => r.json())
      .then(setAttendance);

    fetch(`http://localhost:5500/leaves?employeeId=${user.id}`)
      .then(r => r.json())
      .then(setLeaves);
  }, [user]);

  const presentDays = attendance.filter(a => a.status === "Present").length;
  const leaveTaken = leaves.filter(l => l.status === "approved").length;
  const leavePending = leaves.filter(l => l.status === "pending").length;

  return (
    <div className="app">
      <EmpSidebar />
      <div className="main">
        <Topbar />

        {/* SUMMARY CARDS */}
        <div className="summary-grid">
          <div className="summary-card blue">
            <h4>Present Days</h4>
            <p>{presentDays}</p>
          </div>

          <div className="summary-card green">
            <h4>Leaves Taken</h4>
            <p>{leaveTaken}</p>
          </div>

          <div className="summary-card orange">
            <h4>Leaves Pending</h4>
            <p>{leavePending}</p>
          </div>

          <div className="summary-card purple">
            <h4>Total Records</h4>
            <p>{attendance.length}</p>
          </div>
        </div>

        {/* ATTENDANCE TABLE */}
        <div className="card">
          <h3>My Attendance</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map(a => (
                <tr key={a.id}>
                  <td>{a.date}</td>
                  <td>{a.checkIn || "-"}</td>
                  <td>{a.checkOut || "-"}</td>
                  <td>
                    <span className={`badge ${a.status.toLowerCase()}`}>
                      {a.status}
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


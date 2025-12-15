import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";

export default function HRDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const a = await fetch("http://localhost:5500/attendance").then(r => r.json());
    const e = await fetch("http://localhost:5500/employees").then(r => r.json());
    setAttendance(a);
    setEmployees(e);
  };



 const getEmployeeName = (id) => {
  const emp = employees.find(e => Number(e.id) === Number(id));
  if (!emp) {
    console.warn("Employee not found for ID:", id);
    return "Invalid Employee";
  }
  return emp.name;
};



  // ✅ CHECK IN
  const checkIn = async (employeeId) => {
    const exists = attendance.find(
      a => a.employeeId === employeeId && a.date === today
    );

    if (exists) {
      alert("Already checked in today");
      return;
    }

   const payload = {
  employeeId: Number(employeeId),
  date: today,
  status: "Present",
  checkIn: new Date().toLocaleTimeString(),
  checkOut: ""
};


    await fetch("http://localhost:5500/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    loadData();
  };

 

  return (
    <div className="app">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="main">
        {/* TOP BAR */}
        <Topbar />
        <div className="card">
          <h3>Attendance</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map(a => (
                <tr key={a.id}>
                  <td>{getEmployeeName(a.employeeId)}</td>
                  <td>{a.date}</td>
                  <td>{a.status}</td>
                  <td>{a.checkIn || "-"}</td>
                  <td>{a.checkOut || "-"}</td>
                  <td>
                    <span
                      className={`status ${a.status === "Present" ? "present" : "absent"
                        }`}
                    >
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

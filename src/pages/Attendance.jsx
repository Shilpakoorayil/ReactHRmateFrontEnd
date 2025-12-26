import React, { useEffect, useState, useContext } from "react";
import './Emp.css';
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { AuthContext } from "../context/AuthContext";


export default function Attendance() {
  const { dark, toggleDark } = useContext(AuthContext)
  //To get attendance and employee name
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  //For Emp name and Month Sorting
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");

  ///page
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; 
  const today = new Date().toISOString().slice(0, 10);



  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

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
  // Filter .............................................................
  const filteredAttendance = attendance.filter(a => {
    const empMatch =
      selectedEmployee === "all" ||
      String(a.employeeId) === selectedEmployee;

    const monthMatch =
      selectedMonth === "all" ||
      a.date.slice(0, 7) === selectedMonth;

    return empMatch && monthMatch;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const paginatedAttendance = filteredAttendance.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filteredAttendance.length / rowsPerPage);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedEmployee, selectedMonth]);

  // .....................................................



  // CHECK IN
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
  // ..............................................................
  // CHECK OUT
  const checkOut = async (employeeId) => {
    const todayRecord = attendance.find(
      a => a.employeeId === employeeId && a.date === today
    );

    if (!todayRecord) {
      alert("Employee hasn't checked in today yet!");
      return;
    }

    if (todayRecord.checkOut) {
      alert("Already checked out today!");
      return;
    }

    await fetch(`http://localhost:5500/attendance/${todayRecord.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checkOut: new Date().toLocaleTimeString()
      })
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

         


          <div className="filters">

            {/* EMPLOYEE FILTER */}
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="all">All Employees</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>

            {/* MONTH FILTER */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All Months</option>

              {[...new Set(attendance.map(a => a.date.slice(0, 7)))].map(month => {
                const monthName = new Date(month + "-01").toLocaleString("en-US", { month: "long" });
                return (
                  <option key={month} value={month}>
                    {monthName}
                  </option>
                );
              })}
            </select>


          </div>

          <div className="table-wrapper">



            <table className="table">
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    ⬅ Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={page === currentPage ? "active" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    Next ➡
                  </button>
                </div>
              )}

              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {paginatedAttendance.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  paginatedAttendance.map(a => (
                    <tr key={a.id}>
                      <td>{getEmployeeName(a.employeeId)}</td>
                      <td>{a.date}</td>
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
                  ))
                )}
              </tbody>

            </table>
          </div>





        </div>
      </div>
    </div>
  );
}

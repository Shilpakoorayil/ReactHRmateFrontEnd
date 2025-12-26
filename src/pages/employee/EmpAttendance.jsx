import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./EmpAttendance.css";
import EmpSidebar from "../../components/employee/empSidebar";
import Topbar from "../../components/admin/Topbar";
//...............................................................................


export default function EmployeeAttendance() {
  const { user,dark } = useContext(AuthContext);
  //.......................................................
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  // .......................................................
  const [editId, setEditId] = useState(null);
  const [editCheckIn, setEditCheckIn] = useState("");
  const [editCheckOut, setEditCheckOut] = useState("");
  //....................................................
  const [currentPage, setCurrentPage] = useState(1);//Pagination
  const rowsPerPage = 5; // rows per page
  const today = new Date().toISOString().slice(0, 10);
  //...................................................


  //In order to edit current  checkin and checkout details........
  const handleEdit = (record) => {
    setEditId(record.id);
    setEditCheckIn(record.checkIn || "");
    setEditCheckOut(record.checkOut || "");
  };
  //.In order to Save (button) current  checkin and checkout details..........
  const handleUpdate = async (id) => {
    const res = await fetch(`http://localhost:5500/attendance/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checkIn: editCheckIn,
        checkOut: editCheckOut
      })
    });
    //Update section.................................................
    const updated = await res.json();
    setAttendance(prev =>
      prev.map(a => (a.id === id ? updated : a))
    );

    // Update today 's Attendance if edited row is today.................
    if (todayAttendance?.id === id) {
      setTodayAttendance(updated);
    }

    setEditId(null);
  };

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Load attendance + leaves
  useEffect(() => {
    if (!user?.employeeId) return;

    fetch(`http://localhost:5500/attendance?employeeId=${user.employeeId}`)
      .then(r => r.json())
      .then(data => {
        setAttendance(data);
        const todayRec = data.find(a => a.date === today);
        setTodayAttendance(todayRec || null);
      });

    fetch(`http://localhost:5500/leaves?employeeId=${user.employeeId}`)
      .then(r => r.json())
      .then(setLeaves);
  }, [user, today]);
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // CHECK IN..........................................
  const handleCheckIn = async () => {
    const time = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const payload = {
      employeeId: user.employeeId,
      date: today,
      checkIn: time,
      checkOut: "",
      status: "Present"
    };

    const res = await fetch("http://localhost:5500/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setAttendance(prev => [...prev, data]);
    setTodayAttendance(data);
  };
  //.....................................................................
  // CHECK OUT
  const handleCheckOut = async () => {
    const time = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const res = await fetch(
      `http://localhost:5500/attendance/${todayAttendance.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkOut: time })
      }
    );
    //..................................................................
    const data = await res.json();

    setAttendance(prev =>
      prev.map(a => (a.id === data.id ? data : a))
    );
    setTodayAttendance(data);
  };
  //...............................................
  const sortedAttendance = [...attendance].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const paginatedAttendance = sortedAttendance.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(sortedAttendance.length / rowsPerPage);
  //............................................................
    useEffect(() => {
      if (dark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }, [dark]);
  return (
    <div className="app">
      <EmpSidebar />
      <div className="main">
        <Topbar />







        {/* ATTENDANCE TABLE */}
        <div className="card">
          <h3>My Attendance</h3>

          <table className="table">
            {/* PAGINATION */}
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </div>

            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>


            <tbody>
              {paginatedAttendance.map(a => (
                <tr key={a.id} className={a.date === today ? "today-row" : ""}>
                  <td>{a.date}</td>

                  {/* CHECK IN */}
                  <td>
                    {editId === a.id ? (
                      <input
                        type="time"
                        value={editCheckIn}
                        onChange={e => setEditCheckIn(e.target.value)}
                        className="time-input"
                      />
                    ) : (
                      a.checkIn || "-"
                    )}
                  </td>

                  {/* CHECK OUT */}
                  <td>
                    {editId === a.id ? (
                      <input
                        type="time"
                        value={editCheckOut}
                        onChange={e => setEditCheckOut(e.target.value)}
                        className="time-input"
                      />
                    ) : (
                      a.checkOut || "-"
                    )}
                  </td>

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

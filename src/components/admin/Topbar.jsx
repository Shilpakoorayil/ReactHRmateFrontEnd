import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Topbar.css';

export default function Topbar() {
  const { user, logout, dark } = useContext(AuthContext);

  const [todayAttendance, setTodayAttendance] = useState(null);
  const today = new Date().toISOString().slice(0, 10);

  // Apply Dark Mode
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  // Fetch Today’s Attendance for logged-in user
  useEffect(() => {
    if (!user?.employeeId) return;

    fetch(`http://localhost:5500/attendance?employeeId=${user.employeeId}&date=${today}`)
      .then(res => res.json())
      .then(data => setTodayAttendance(data[0] || null));
  }, [user, today]);

// CHECK-IN.........................................................
const handleCheckIn = async () => {
  const time = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const payload = {
    employeeId: user.employeeId,
    employeeName: user.name,  // 👈 SAVE NAME
    email: user.email,        // 👈 SAVE EMAIL
    department: user.department, // 👈 SAVE DEPARTMENT
    designation: user.designation, // 👈 SAVE DESIGNATION
    date: today,
    checkIn: time,
    checkOut: "",
    status: "Present",
  };

  const res = await fetch("http://localhost:5500/attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  setTodayAttendance(data);
};

  // CHECK-OUT...................................................................


  const handleCheckOut = async () => {
    const time = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const res = await fetch(
      `http://localhost:5500/attendance/${todayAttendance.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkOut: time }),
      }
    );

    const data = await res.json();
    setTodayAttendance(data);
  };


  
  return (
    <header className="topbar">
      <div className="left">
        <span className="logo">HRMatrix</span>
      </div>

      <div className="right">

        {/* SHOW CHECK-IN / CHECK-OUT BUTTONS */}

        {user?.role === "employee" && (
          <>
            {!todayAttendance ? (
              <button className="btn checkin" onClick={handleCheckIn}>
                Check In
              </button>
                       ) : !todayAttendance.checkOut ? (
              <button className="btn checkout" onClick={handleCheckOut}>
                Check Out
              </button>
            ) : null}


           
          </>
        )}
 <span className="user-email">{user.email}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
        
      </div>
    </header>
  );
}

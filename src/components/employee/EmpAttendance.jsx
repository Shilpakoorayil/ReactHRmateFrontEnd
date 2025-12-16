import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { AuthContext } from "../../context/AuthContext";
import EmpSidebar from "../../components/employee/empSidebar";
import Topbar from "../../components/admin/Topbar";
import "./EmpAttendance.css";

export default function EmpAttendance() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5500/attendance?employeeId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const mappedEvents = data.map((a) => ({
          title: a.checkOut ? "Present" : "Check-out Missing",
          date: a.date,
          backgroundColor: a.checkOut ? "#22c55e" : "#ef4444",
          borderColor: a.checkOut ? "#16a34a" : "#dc2626"
        }));

        setEvents(mappedEvents);
      });
  }, [user]);

  return (
    <div className="app">
      <EmpSidebar />

      <div className="main">
        <Topbar />

        <div className="card">
          <h3>My Attendance Calendar</h3>

          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}

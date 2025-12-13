import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


export default function CalendarComp() {

  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // ⭐ Load events from backend
  useEffect(() => {
    fetch("http://localhost:5500/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  // ⭐ When clicking date → show events of that date
  const handleDateClick = (date) => {
    setValue(date);

    const clicked = events.filter(
      ev => ev.date === date.toISOString().split("T")[0]
    );

    setSelectedDateEvents(clicked);
  };

  // ⭐ Highlight event dates
  const tileClassName = ({ date }) => {
    const dateStr = date.toISOString().split("T")[0];

    if (events.some(ev => ev.date === dateStr)) {
      return "event-day"; // apply highlight CSS
    }
    return null;
  };

  return (
    <div>
      <Calendar
        onClickDay={handleDateClick}
        value={value}
        tileClassName={tileClassName}
        className="dashboard-calendar"
      />

      {/* ⭐ Show events for selected date */}
      <div className="date-events">
        <h4>Events on {value.toDateString()}</h4>

        {selectedDateEvents.length === 0 && (
          <p className="no-event">No events for this date.</p>
        )}

        {selectedDateEvents.map(ev => (
          <div key={ev.id} className="event-item">
            <strong>{ev.title}</strong>
            <span className={`badge ${ev.type}`}>{ev.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

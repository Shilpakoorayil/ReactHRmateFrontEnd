import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function AttandanceChart() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/attendance")
      .then(res => res.json())
      .then(setAttendance);
  }, []);

  const presentCount = attendance.filter(a => a.status === "Present").length;
  const absentCount = attendance.filter(a => a.status === "Absent").length;

  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance Count",
        data: [presentCount, absentCount],
        backgroundColor: ["#0a8f5b", "#d93025"]
      }
    ]
  };

  return (
    <div className="card">
      <h3>Attendance Overview</h3>
      <Bar data={data} />
    </div>
  );
}

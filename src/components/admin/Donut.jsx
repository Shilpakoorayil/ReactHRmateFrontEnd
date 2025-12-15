import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

export default function Donut() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  // Count employees by each department
  const countDept = (dept) =>
    employees.filter(e => e.department?.toLowerCase() === dept.toLowerCase()).length;

  const deptLabels = ["IT", "HR", "Finance", "Marketing"];
  const deptData = [
    countDept("IT"),
    countDept("HR"),
    countDept("Finance"),
    countDept("Marketing"),
  ];

  // Custom department colors
  const deptColors = {
    IT: "#1E90FF",        // Blue
    HR: "#FFD700",        // Yellow
    Finance: "#8A2BE2",   // Purple
    Marketing: "#00CED1"  // Aqua
  };

  const data = {
    labels: deptLabels,
    datasets: [
      {
        data: deptData,
        backgroundColor: [
          deptColors.IT,
          deptColors.HR,
          deptColors.Finance,
          deptColors.Marketing
        ]
      }
    ]
  };

  return (
    <div style={{ maxWidth: 260 }}>
      <Doughnut data={data} />
    </div>
  );
}

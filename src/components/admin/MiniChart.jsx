import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// REGISTER ELEMENTS FOR LINE CHART
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function MiniChart() {
  const data = {
    labels: ["Jun", "Jul", "Aug", "Sept", "Oct", "Nov"],
    datasets: [
      {
        label: "Performance",
        data: [40, 55, 60, 70, 65, 80],
        borderColor: "#4f46e5",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Line data={data} />
    </div>
  );
}

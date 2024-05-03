import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ConvertedTime from "../../utils/ConvertedTime";
import "./Chart.css";

// Register Chart.js components and plugins
ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Title,
  ChartDataLabels
);

// Define the Chart component
const Chart = ({ forecastData, option, unit }) => {
  // Function to calculate font size based on viewport size
  const calculateFontSize = () => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    return Math.round((0.7 * vh + 0.7 * vw) / 100);
  };

  // Determine chart color based on the selected option
  const chartColor =
    option === "Temperature"
      ? { border: "#FFCC00", back: "#FFCC0099" }
      : { border: "#0bf", back: "#0bf5" };

  // Extract data points for the chart
  const datas = forecastData.list
    .slice(0, 8)
    .map((entry) =>
      option === "Temperature" ? entry.main.temp : entry.main.humidity
    );

  // Define chart data
  const data = {
    labels: forecastData.list.slice(0, 8).map((entry) => {
      // Convert timestamps to local time
      const convertedTime = ConvertedTime(entry.dt, forecastData.city.timezone);
      return `${convertedTime.currentHour}`;
    }),
    datasets: [
      {
        data: datas,
        backgroundColor: chartColor.back,
        borderColor: chartColor.border,
        pointBorderColor: chartColor.border,
        pointBackgroundColor: chartColor.border,
        pointStyle: "circle",
        pointRadius: parseInt(calculateFontSize() / 3),
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Define chart options
  const options = {
    plugins: {
      // Configure data labels plugin
      datalabels: {
        color: "white",
        align: "end",
        anchor: "end",
        font: { size: calculateFontSize() },
        formatter: (value) => {
          // Convert temperature or humidity values based on the selected unit
          const convertedValue =
            option === "Temperature"
              ? unit === "metric"
                ? `${Math.round(value)}°C`
                : `${Math.round((value * 9) / 5 + 32)}°F`
              : `${Math.round(value)}%`;
          return convertedValue;
        },
      },
    },
    scales: {
      // Configure x-axis
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
          font: { size: calculateFontSize() },
        },
      },
      // Configure y-axis
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "transparent",
        },
        suggestedMin: Math.min(...datas) - 4,
        suggestedMax: Math.max(...datas) + 4,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
  };

  return (
    <div className="chart-container">
      {/* Render the Line chart */}
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;

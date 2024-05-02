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

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Title,
  ChartDataLabels
);

const Chart = ({ forecastData, option, unit }) => {
  const calculateFontSize = () => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    return Math.round((0.7 * vh + 0.7 * vw) / 100);
  };

  const chartColor =
    option === "Temperature"
      ? { border: "#FFCC00", back: "#FFCC0099" }
      : { border: "#0bf", back: "#0bf5" };
  const datas = forecastData.list
    .slice(0, 8)
    .map((entry) =>
      option === "Temperature" ? entry.main.temp : entry.main.humidity
    );
  const data = {
    labels: forecastData.list.slice(0, 8).map((entry) => {
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
        tension: calculateFontSize() / 50,
        fill: true,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "white",
        align: "end",
        anchor: "end",
        font: { size: calculateFontSize() },
        formatter: (value) => {
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
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
          font: { size: calculateFontSize() },
        },
      },
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
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;

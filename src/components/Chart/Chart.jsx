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
        tension: 0.4,
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
        font: { size: 14 },
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
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "transparent",
        },
        suggestedMin: Math.min(...datas) - 5,
        suggestedMax: Math.max(...datas) + 5,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
  };

  return (
    <div style={{ height: "230px", width: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
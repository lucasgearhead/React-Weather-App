import React, { useState } from "react";
import "./FooterGraphics.css";
import WindCard from "../WindCard/WindCard";
import Chart from "../Chart/Chart";

export default function FooterGraphics({ forecastData, unit }) {
  const [selectedData, setSelectedData] = useState("Temperature");

  const handleSelectData = (data) => {
    setSelectedData(data);
  };

  return (
    <div className="GraphicsContainer">
      <div className="spans">
        <span
          className={`chart-span ${
            selectedData === "Temperature" ? "" : "deactive"
          }`}
          onClick={() => handleSelectData("Temperature")}
        >
          Temperature
        </span>
        <div className="bar" />
        <span
          className={`chart-span ${
            selectedData === "Humidity" ? "" : "deactive"
          }`}
          onClick={() => handleSelectData("Humidity")}
        >
          Humidity
        </span>
        <div className="bar" />
        <span
          className={`chart-span ${selectedData === "Wind" ? "" : "deactive"}`}
          onClick={() => handleSelectData("Wind")}
        >
          Wind
        </span>
      </div>
      <div>
        {selectedData === "Wind" ? (
          <WindCard forecastData={forecastData} unit={unit} />
        ) : selectedData === "Temperature" ? (
          <Chart
            forecastData={forecastData}
            option={"Temperature"}
            unit={unit}
          />
        ) : selectedData === "Humidity" ? (
          <Chart forecastData={forecastData} option={"Humidity"} unit={unit} />
        ) : (
          <p>ERROR</p>
        )}
      </div>
    </div>
  );
}

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
          className={`GraphicsChooses ${
            selectedData === "Temperature" ? "" : "deactive"
          }`}
          onClick={() => handleSelectData("Temperature")}
        >
          Temperature
        </span>
        <div className="bar" />
        <span
          className={`GraphicsChooses ${
            selectedData === "Humidity" ? "" : "deactive"
          }`}
          onClick={() => handleSelectData("Humidity")}
        >
          Humidity
        </span>
        <div className="bar" />
        <span
          className={`GraphicsChooses ${
            selectedData === "Wind" ? "" : "deactive"
          }`}
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
          <p>ERRO</p>
        )}
      </div>
    </div>
  );
}

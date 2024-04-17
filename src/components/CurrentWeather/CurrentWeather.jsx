import { React, useState } from "react";
import "./CurrentWeather.css";

export default function CurrentWeather({ weatherData }) {
  const [unit, setUnit] = useState("metric");
  const isMetric = unit === "metric";

  const handleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
  };

  const convertTemperature = (temperature, unit) => {
    if (unit === "metric") {
      return Math.round(temperature);
    } else if (unit === "imperial") {
      return Math.round((temperature * 9) / 5 + 32);
    } else {
      return "";
    }
  };

  const convertSpeed = (speed, unit) => {
    if (unit === "metric") {
      return `${Math.round(speed * 3.6)} km/h`;
    } else if (unit === "imperial") {
      return `${speed} mph`;
    } else {
      return "";
    }
  };

  return (
    <div className="currentWeatherContainer">
      <div className="info">
        <div className="temp">
          {convertTemperature(weatherData.main.temp, unit)}
        </div>
        <div className="moreInfo">
          <span onClick={handleUnit}>
            <p className={isMetric ? "" : "active"}>°C</p>
            <hr />
            <p className={isMetric ? "active" : ""}>°F</p>
          </span>
          <p className="rain">Cloudiness: {weatherData.clouds.all + "%"}</p>
          <p className="humidity">
            Humidity: {weatherData.main.humidity + "%"}
          </p>
          <p className="wind">
            Wind: {convertSpeed(weatherData.wind.speed, unit)}
          </p>
        </div>
      </div>
      <div className="weather">{weatherData.weather[0].description}</div>
    </div>
  );
}

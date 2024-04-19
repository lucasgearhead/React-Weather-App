import { React } from "react";
import "./CurrentWeather.css";

export default function CurrentWeather({
  weatherData,
  weatherUnit,
  toggleUnit,
}) {
  const isMetric = weatherUnit === "metric";

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
          {convertTemperature(weatherData.main.temp, weatherUnit)}
        </div>
        <div className="moreInfo">
          <span onClick={toggleUnit}>
            <p className={isMetric ? "" : "active"}>°C</p>
            <hr />
            <p className={isMetric ? "active" : ""}>°F</p>
          </span>
          <p className="rain">Cloudiness: {weatherData.clouds.all + "%"}</p>
          <p className="humidity">
            Humidity: {weatherData.main.humidity + "%"}
          </p>
          <p className="wind">
            Wind: {convertSpeed(weatherData.wind.speed, weatherUnit)}
          </p>
        </div>
      </div>
      <div className="weather">{weatherData.weather[0].description}</div>
    </div>
  );
}

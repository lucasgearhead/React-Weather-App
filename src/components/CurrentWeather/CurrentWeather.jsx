import React from "react";
import "./CurrentWeather.css";

export default function CurrentWeather({
  temp,
  rain,
  humidity,
  wind,
  weather,
}) {
  return (
    <div className="currentWeatherContainer">
      <div className="info">
        <div className="temp">{temp}</div>
        <div className="moreInfo">
          <div className="buttons">
            <a href="#">°C</a>
            <hr />
            <a href="#">°F</a>
          </div>
          <p className="rain">Rain: {rain}</p>
          <p className="humidity">Humidity: {humidity}</p>
          <p className="wind">Wind: {wind}</p>
        </div>
      </div>
      <div className="weather">{weather}</div>
    </div>
  );
}

import { React } from "react";
import "./CurrentWeather.css";
import ConvertedTemperature from "../../utils/ConvertedTemperature";
import ConvertedSpeed from "../../utils/ConvertedSpeed";

export default function CurrentWeather({ weatherData, unit, toggleUnit }) {
  return (
    <div className="currentWeatherContainer">
      <div className="info">
        <div className="temp">
          {
            ConvertedTemperature(weatherData.main.temp, unit)
              .convertedTemperature
          }
        </div>
        <div className="moreInfo">
          <span onClick={toggleUnit}>
            <p className={unit === "metric" ? "" : "deactive"}>°C</p>
            <hr />
            <p className={unit === "metric" ? "deactive" : ""}>°F</p>
          </span>
          <p className="rain">Cloudiness: {weatherData.clouds.all + "%"}</p>
          <p className="humidity">
            Humidity: {weatherData.main.humidity + "%"}
          </p>
          <p className="wind">
            Wind: {ConvertedSpeed(weatherData.wind.speed, unit).convertedSpeed}
          </p>
        </div>
      </div>
      <div className="weather">{weatherData.weather[0].description}</div>
    </div>
  );
}

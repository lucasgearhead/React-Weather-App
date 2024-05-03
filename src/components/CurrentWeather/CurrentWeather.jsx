import { React } from "react";
import "./CurrentWeather.css";
import ConvertedTemperature from "../../utils/ConvertedTemperature";
import ConvertedSpeed from "../../utils/ConvertedSpeed";

export default function CurrentWeather({ weatherData, unit, toggleUnit }) {
  return (
    <div className="currentWeatherContainer">
      {/* Display temperature */}
      <div className="info">
        <div className="temp">
          {/* Convert and display temperature */}
          {
            ConvertedTemperature(weatherData.main.temp, unit)
              .convertedTemperature
          }
        </div>
        {/* Additional weather information */}
        <div className="moreInfo">
          {/* Toggle unit between Celsius and Fahrenheit */}
          <span onClick={toggleUnit} className="toggle-unit">
            <p className={unit === "metric" ? "" : "deactive"}>°C</p>
            <hr />
            <p className={unit === "metric" ? "deactive" : ""}>°F</p>
          </span>
          {/* Display cloudiness */}
          <p className="rain">Cloudiness: {weatherData.clouds.all + "%"}</p>
          {/* Display humidity */}
          <p className="humidity">
            Humidity: {weatherData.main.humidity + "%"}
          </p>
          {/* Display wind speed */}
          <p className="wind">
            Wind: {ConvertedSpeed(weatherData.wind.speed, unit).convertedSpeed}
          </p>
        </div>
      </div>
      {/* Display weather description */}
      <div className="weather">{weatherData.weather[0].description}</div>
    </div>
  );
}

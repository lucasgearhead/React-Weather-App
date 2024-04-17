import React, { useState } from "react";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import DateTime from "./components/DateTime/DateTime";
import Search from "./components/Search/Search";
import Loading from "./components/Loading/Loading";
import { ReactComponent as SunIcon } from "./assets/icons/weather/sun.svg";
import { ReactComponent as MoonIcon } from "./assets/icons/weather/moon.svg";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDay, setIsDay] = useState(false);

  const fetchData = async (city) => {
    setIsLoading(true);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1871496f2ca4459545804dd8e8be545b&units=metric`
      );
      const wData = await weatherResponse.json();

      if (wData.cod === 200) {
        setWeatherData(wData);
      } else {
        alert(wData.message);
      }
    } catch (error) {
      alert("Error fetching weather data:", error);
    }

    try {
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1871496f2ca4459545804dd8e8be545b&units=metric`
      );

      const fData = await forecastResponse.json();

      if (fData.cod === "200") {
        setForecastData(fData);
        console.log(forecastData);
      } else {
        alert(fData.message);
      }
    } catch (error) {
      alert("Error fetching weather data:", error);
    }
    setIsLoading(false);
  };

  const dayOrNight = (value) => {
    setIsDay(value);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : weatherData == null ? (
        <div className="chooseCity">
          <h1>Weather</h1>
          <Search handleCity={fetchData} />
        </div>
      ) : (
        <div className={`${isDay ? "day" : "night"}`}>
          <div className="app">
            {isDay ? (
              <SunIcon className="sun" />
            ) : (
              <MoonIcon className="moon" />
            )}
            <CurrentWeather weatherData={weatherData} />
            <div>
              <DateTime weatherData={weatherData} dayOrNight={dayOrNight} />
              <Search handleCity={fetchData} weatherData={weatherData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

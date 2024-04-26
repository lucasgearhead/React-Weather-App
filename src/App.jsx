import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import DateTime from "./components/DateTime/DateTime";
import Search from "./components/Search/Search";
import Loading from "./components/Loading/Loading";
import ForecastWeather from "./components/ForecastWeather/ForecastWeather";
import { ReactComponent as SunIcon } from "./assets/icons/weather/sun.svg";
import { ReactComponent as MoonIcon } from "./assets/icons/weather/moon.svg";
import "./App.css";
import FooterGraphics from "./components/FooterGraphics/FooterGraphics";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDay, setIsDay] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const appid = "YOUR API KEY";

  useEffect(() => {
    const fetchInitialWeather = async () => {
      const cityFromIP = await fetchLocationByIP();
      if (cityFromIP) {
        await fetchData(cityFromIP);
      } else {
        setIsLoading(false);
      }
    };
    fetchInitialWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLocationByIP = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      return data.city;
    } catch (error) {
      console.error("Error fetching location by IP:", error);
      return null;
    }
  };

  const fetchData = async (city) => {
    setIsLoading(true);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`
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
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appid}&units=metric`
      );

      const fData = await forecastResponse.json();

      if (fData.cod === "200") {
        setForecastData(fData);
      } else {
        alert(fData.message);
      }
    } catch (error) {
      alert("Error fetching forecast data:", error);
    }

    setIsLoading(false);
  };

  const dayOrNight = (value) => {
    setIsDay(value);
  };

  const toggleUnit = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newUnit = unit === "metric" ? "imperial" : "metric";
      setUnit(newUnit);
      setIsLoading(false);
    }, 500);
  };

  const currentDayOfWeek = (value) => {
    setDayOfWeek(value);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={`app-container ${isDay ? "day" : "night"}`}>
          <div className="app">
            {isDay ? (
              <SunIcon className="sun" />
            ) : (
              <MoonIcon className="moon" />
            )}
            <CurrentWeather
              weatherData={weatherData}
              unit={unit}
              toggleUnit={toggleUnit}
            />
            <div>
              <DateTime
                weatherData={weatherData}
                isDayOrNight={dayOrNight}
                theCurrentDayOfWeek={currentDayOfWeek}
              />
              <Search handleCity={fetchData} weatherData={weatherData} />
            </div>
          </div>
          <ForecastWeather
            forecastData={forecastData}
            unit={unit}
            currentDayOfWeek={dayOfWeek}
          />
          <FooterGraphics forecastData={forecastData} unit={unit} />
        </div>
      )}
    </>
  );
}

export default App;

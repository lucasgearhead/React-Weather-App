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
import AlertBox from "./components/AlertBox/AlertBox";

function App() {
  // State variables
  const [weatherData, setWeatherData] = useState(null); // Stores current weather data
  const [forecastData, setForecastData] = useState([]); // Stores forecast weather data
  const [isLoading, setIsLoading] = useState(true); // Indicates whether data is loading
  const [isDay, setIsDay] = useState(false); // Indicates whether it's daytime or nighttime
  const [unit, setUnit] = useState("metric"); // Stores temperature unit (metric or imperial)
  const [dayOfWeek, setDayOfWeek] = useState(""); // Stores current day of the week
  const [errorMessage, setErrorMessage] = useState(null); // Stores error message, if any
  const appid = "YOUR API KEY"; // Your OpenWeatherMap API key

  useEffect(() => {
    // Fetch initial weather data
    const fetchInitialWeather = async () => {
      const cityFromIP = await fetchLocationByIP();
      if (cityFromIP) {
        await fetchData(cityFromIP);
      } else {
        await fetchData("london");
      }
    };
    fetchInitialWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to fetch location by IP address
  const fetchLocationByIP = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      return data.city;
    } catch (error) {
      alert("Error fetching location by IP:", error);
      return null;
    }
  };

  // Function to fetch weather data
  const fetchData = async (city) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // Fetch current weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`
      );
      const wData = await weatherResponse.json();

      if (wData.cod === 200) {
        setWeatherData(wData);
      } else {
        setErrorMessage(wData);
      }
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }

    // Fetch forecast data if no error occurred in fetching current weather
    if (errorMessage === null) {
      try {
        // Fetch forecast weather data
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appid}&units=metric`
        );

        const fData = await forecastResponse.json();
        if (fData.cod === "200") {
          setForecastData(fData);
        } else {
          setErrorMessage(fData);
        }
      } catch (error) {
        console.log("Error fetching forecast data:", error);
      }
    }

    setIsLoading(false); // Set loading state to false after data fetching is done
  };

  // Callback function to set day or night based on received value
  const dayOrNight = (value) => {
    setIsDay(value);
  };

  // Function to toggle temperature unit between metric and imperial
  const toggleUnit = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newUnit = unit === "metric" ? "imperial" : "metric";
      setUnit(newUnit);
      setIsLoading(false);
    }, 500);
  };

  // Callback function to set current day of the week
  const currentDayOfWeek = (value) => {
    setDayOfWeek(value);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        // Display an alert box with error message if there's an error
        <AlertBox
          errorMessage={errorMessage}
          handleCity={fetchData}
          weatherData={weatherData}
        />
      ) : (
        <div className={`app-container ${isDay ? "day" : "night"}`}>
          <div className="app">
            {/* Display sun or moon icon based on whether it's day or night */}
            {isDay ? (
              <SunIcon className="sun" />
            ) : (
              <MoonIcon className="moon" />
            )}
            {/* Render CurrentWeather component */}
            <CurrentWeather
              weatherData={weatherData}
              unit={unit}
              toggleUnit={toggleUnit}
            />
            <div>
              {/* Render DateTime and Search components */}
              <DateTime
                weatherData={weatherData}
                isDayOrNight={dayOrNight}
                theCurrentDayOfWeek={currentDayOfWeek}
              />
              <Search handleCity={fetchData} weatherData={weatherData} />
            </div>
          </div>
          {/* Render ForecastWeather and FooterGraphics components */}
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

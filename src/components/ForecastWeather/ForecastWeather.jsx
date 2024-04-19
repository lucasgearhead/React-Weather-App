import { React } from "react";
import "./ForecastWeather.css";

export default function ForecastWeather({
  forecastData,
  unit,
  currentDayOfWeek,
}) {
  const formDayWeek = (dayOfWeek) => {
    const dayWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return dayWeek.indexOf(dayOfWeek) !== -1 ? dayOfWeek : "";
  };

  const convertTemperature = (temperature) => {
    if (unit === "metric") {
      return Math.round(temperature);
    } else if (unit === "imperial") {
      return Math.round((temperature * 9) / 5 + 32);
    } else {
      return "";
    }
  };

  // Define a função adjustIconForDay fora do reduce
  function adjustIconForDay(iconCode) {
    if (iconCode.endsWith("n")) {
      return iconCode.slice(0, -1) + "d"; // Substitui 'n' por 'd'
    }
    return iconCode; // Retorna o mesmo ícone se não terminar com 'n'
  }

  const groupedForecasts = forecastData.reduce((acc, forecast) => {
    const day = formDayWeek(
      new Date(forecast.dt_txt).toLocaleDateString("en-US", { weekday: "long" })
    );
    const existingDay = acc[day];

    if (existingDay) {
      const priorityIcons = {
        "09d": 1,
        "09n": 2,
        "10d": 3,
        "10n": 4,
        "13d": 5,
        "13n": 6,
        "50d": 7,
        "50n": 8,
        "04d": 9,
        "04n": 10,
        "03d": 11,
        "03n": 12,
        "02d": 13,
        "02n": 14,
        "01d": 15,
        "01n": 16,
      };

      const adjustedIcon = adjustIconForDay(forecast.weather[0].icon);

      if (priorityIcons[adjustedIcon] < priorityIcons[existingDay.icon]) {
        existingDay.icon = adjustedIcon;
        existingDay.description = forecast.weather[0].main;
      }

      existingDay.temp_min = Math.min(
        existingDay.temp_min,
        forecast.main.temp_min
      );
      existingDay.temp_max = Math.max(
        existingDay.temp_max,
        forecast.main.temp_max
      );
    } else {
      acc[day] = {
        day,
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        icon: adjustIconForDay(forecast.weather[0].icon),
        description: forecast.weather[0].description,
      };
    }

    return acc;
  }, {});

  const dailyForecasts = Object.values(groupedForecasts);

  return (
    <>
      <div className="cardContainer">
        {dailyForecasts.map((dayForecast) => {
          const dayOfWeek = formDayWeek(dayForecast.day);
          const isToday = dayOfWeek === currentDayOfWeek;

          return (
            <div
              key={dayForecast.day}
              className={`card ${isToday ? "today" : ""}`}
            >
              <div>{dayForecast.day}</div>
              <img
                src={`http://openweathermap.org/img/wn/${dayForecast.icon}@4x.png`}
                alt="Weather Icon"
                className="weatherIcon"
              />
              <p className="forecastDescription">{dayForecast.description}</p>
              <div className="temps">
                <p>{convertTemperature(dayForecast.temp_max)}°</p>
                <p className="tempMin">
                  {convertTemperature(dayForecast.temp_min)}°
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

import "./ForecastWeather.css";
import ConvertedTime from "../../utils/ConvertedTime";
import ConvertedTemperature from "../../utils/ConvertedTemperature";

export default function ForecastWeather({ forecastData, unit }) {
  const currentDayOfWeekConverted = ConvertedTime(
    forecastData.list[0].dt,
    forecastData.city.timezone
  ).currentDayOfWeek;

  function adjustIconForDay(iconCode) {
    if (iconCode.endsWith("n")) {
      return iconCode.slice(0, -1) + "d";
    }
    return iconCode;
  }

  const groupedForecasts = forecastData.list.reduce((acc, forecast) => {
    const day = ConvertedTime(
      forecast.dt,
      forecastData.city.timezone
    ).currentDayOfWeek;
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
        ConvertedTemperature(forecast.main.temp_min, unit).convertedTemperature
      );
      existingDay.temp_max = Math.max(
        existingDay.temp_max,
        ConvertedTemperature(forecast.main.temp_max, unit).convertedTemperature
      );
    } else {
      acc[day] = {
        day,
        temp_min: ConvertedTemperature(forecast.main.temp_min, unit)
          .convertedTemperature,
        temp_max: ConvertedTemperature(forecast.main.temp_max, unit)
          .convertedTemperature,
        icon: adjustIconForDay(forecast.weather[0].icon),
        description: forecast.weather[0].description,
      };
    }

    return acc;
  }, {});

  const dailyForecasts = Object.values(groupedForecasts);

  return (
    <div className="cardContainer">
      {dailyForecasts.map((dayForecast) => {
        const isToday = dayForecast.day === currentDayOfWeekConverted;

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
              <p>{dayForecast.temp_max + "°"}</p>
              <p className="deactive">{dayForecast.temp_min + "°"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

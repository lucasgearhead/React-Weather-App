import "./ForecastWeather.css";
import ConvertedTime from "../../utils/ConvertedTime";
import ConvertedTemperature from "../../utils/ConvertedTemperature";

export default function ForecastWeather({ forecastData, unit }) {
  // Get the current day of the week converted to match the forecast timezone
  const currentDayOfWeekConverted = ConvertedTime(
    forecastData.list[0].dt,
    forecastData.city.timezone
  ).currentDayOfWeek;

  // Function to adjust icon for day or night
  function adjustIconForDay(iconCode) {
    if (iconCode.endsWith("n")) {
      return iconCode.slice(0, -1) + "d";
    }
    return iconCode;
  }

  // Group forecasts by day and calculate min/max temperatures
  const groupedForecasts = forecastData.list.reduce((acc, forecast) => {
    const day = ConvertedTime(
      forecast.dt,
      forecastData.city.timezone
    ).currentDayOfWeek;
    const existingDay = acc[day];

    if (existingDay) {
      // Define priority icons for weather conditions
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

      // Adjust icon for day or night
      const adjustedIcon = adjustIconForDay(forecast.weather[0].icon);

      // Update day's icon and description if priority is higher
      if (priorityIcons[adjustedIcon] < priorityIcons[existingDay.icon]) {
        existingDay.icon = adjustedIcon;
        existingDay.description = forecast.weather[0].main;
      }

      // Update min/max temperatures
      existingDay.temp_min = Math.min(
        existingDay.temp_min,
        ConvertedTemperature(forecast.main.temp_min, unit).convertedTemperature
      );
      existingDay.temp_max = Math.max(
        existingDay.temp_max,
        ConvertedTemperature(forecast.main.temp_max, unit).convertedTemperature
      );
    } else {
      // Create a new entry for the day if it doesn't exist
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

  // Extract daily forecasts from grouped forecasts
  const dailyForecasts = Object.values(groupedForecasts);

  return (
    <div className="cardContainer">
      {/* Render daily forecasts */}
      {dailyForecasts.map((dayForecast) => {
        // Check if forecast is for today
        const isToday = dayForecast.day === currentDayOfWeekConverted;

        return (
          <div
            key={dayForecast.day}
            className={`card ${isToday ? "today" : ""}`}
          >
            {/* Display day of the week */}
            <div>{dayForecast.day}</div>
            {/* Display weather icon */}
            <img
              src={`http://openweathermap.org/img/wn/${dayForecast.icon}@4x.png`}
              alt="Weather Icon"
              className="weatherIcon"
            />
            {/* Display weather description */}
            <p className="forecastDescription">{dayForecast.description}</p>
            {/* Display min/max temperatures */}
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

import { React, useEffect } from "react";
import "./DateTime.css";
import ConvertedTime from "../../utils/ConvertedTime";

export default function DateTime({
  weatherData,
  isDayOrNight,
  theCurrentDayOfWeek,
}) {
  // Extract current day of the week, day or night status, and current hour from ConvertedTime utility
  const { currentDayOfWeek, dayOrNight, currentHour } = ConvertedTime(
    weatherData.dt,
    weatherData.timezone
  );

  // Update day or night status and current day of the week when weather data changes
  useEffect(() => {
    isDayOrNight(dayOrNight);
    theCurrentDayOfWeek(currentDayOfWeek);
  }, [
    weatherData,
    isDayOrNight,
    currentDayOfWeek,
    dayOrNight,
    currentHour,
    theCurrentDayOfWeek,
  ]);

  return (
    <div className="datetime">
      {/* Display current hour */}
      <p className="time">{currentHour}</p>
      {/* Display current day of the week */}
      <p className="currentDay">{currentDayOfWeek}</p>
    </div>
  );
}

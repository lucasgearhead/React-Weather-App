import { React, useEffect, useState } from "react";
import "./DateTime.css";

export default function DateTime({
  weatherData,
  dayOrNight,
  currentDayOfWeek,
  returnDayOfWeek,
}) {
  const [currentHour, setCurrentHour] = useState(false);

  useEffect(() => {
    const convertTime = (dt, timezone) => {
      const timestamp = new Date(dt * 1000);
      const localTime = timestamp.getTime();
      const targetTime = localTime + timezone * 1000;
      const targetDate = new Date(targetTime);

      const hours = targetDate.getUTCHours().toString().padStart(2, "0");
      const minutes = targetDate.getUTCMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      setCurrentHour(hours);

      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayOfWeek = daysOfWeek[targetDate.getUTCDay()];

      setCurrentHour(formattedTime);
      currentDayOfWeek(dayOfWeek);
      dayOrNight(hours > 4 && hours < 18 ? true : false);
    };

    convertTime(weatherData.dt, weatherData.timezone);
  }, [dayOrNight, weatherData.dt, weatherData.timezone, currentDayOfWeek]);

  return (
    <div className="datetime">
      <p className="time">{currentHour}</p>
      <p className="currentDay">{returnDayOfWeek}</p>
    </div>
  );
}

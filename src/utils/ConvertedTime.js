import { useEffect, useState } from "react";

export default function ConvertedTime(dt, timezone) {
  // State variables to store current hour, day of week, and day or night status
  const [currentHour, setCurrentHour] = useState(false);
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(false);
  const [dayOrNight, setDayOrNight] = useState(false);

  useEffect(() => {
    // Calculate local time based on timestamp and timezone
    const timestamp = new Date(dt * 1000);
    const localTime = timestamp.getTime();
    const targetTime = localTime + timezone * 1000;
    const targetDate = new Date(targetTime);

    // Format hours and minutes
    const hours = targetDate.getUTCHours().toString().padStart(2, "0");
    const minutes = targetDate.getUTCMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    // Array of days of the week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    // Get day of the week
    const dayOfWeek = daysOfWeek[targetDate.getUTCDay()];

    // Set state variables
    setCurrentHour(formattedTime);
    setCurrentDayOfWeek(dayOfWeek);
    // Determine if it's day or night based on current hour
    setDayOrNight(hours > 4 && hours < 18 ? true : false);
  }, [dt, timezone]); // Update effect when dt or timezone changes

  // Return current day of the week, day or night status, and current hour
  return { currentDayOfWeek, dayOrNight, currentHour };
}

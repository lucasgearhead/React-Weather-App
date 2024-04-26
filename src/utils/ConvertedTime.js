import { useEffect, useState } from "react";

export default function ConvertedTime(dt, timezone) {
  const [currentHour, setCurrentHour] = useState(false);
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(false);
  const [dayOrNight, setDayOrNight] = useState(false);

  useEffect(() => {
    const timestamp = new Date(dt * 1000);
    const localTime = timestamp.getTime();
    const targetTime = localTime + timezone * 1000;
    const targetDate = new Date(targetTime);

    const hours = targetDate.getUTCHours().toString().padStart(2, "0");
    const minutes = targetDate.getUTCMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

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
    setCurrentDayOfWeek(dayOfWeek);
    setDayOrNight(hours > 4 && hours < 18 ? true : false);
  }, [dt, timezone]);

  return { currentDayOfWeek, dayOrNight, currentHour };
}

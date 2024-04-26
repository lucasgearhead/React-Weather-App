import { React, useEffect } from "react";
import "./DateTime.css";
import ConvertedTime from "../../utils/ConvertedTime";

export default function DateTime({
  weatherData,
  isDayOrNight,
  theCurrentDayOfWeek,
}) {
  //const [currentHour, setCurrentHour] = useState(false);
  const { currentDayOfWeek, dayOrNight, currentHour } = ConvertedTime(
    weatherData.dt,
    weatherData.timezone
  );

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
      <p className="time">{currentHour}</p>
      <p className="currentDay">{currentDayOfWeek}</p>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./WindCard.css";
import ConvertedTime from "../../utils/ConvertedTime";
import ConvertedSpeed from "../../utils/ConvertedSpeed";

export default function WindCard({ forecastData, unit }) {
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    setShowCards(true);
  }, []);

  return (
    <div className="wind-container">
      {forecastData.list.slice(0, 8).map((data, index) => {
        const { currentHour } = ConvertedTime(
          data.dt,
          forecastData.city.timezone
        );
        return (
          <div key={index} className={`wind-card ${showCards ? "show" : ""}`}>
            <p>{ConvertedSpeed(data.wind.speed, unit).convertedSpeed}</p>
            <div
              className="arrow-container"
              style={{
                transform: `rotate(${data.wind.deg - 180}deg)`,
              }}
            >
              <div className="arrow"></div>
              <div className="body-arrow"></div>
            </div>
            <p>{currentHour}</p>
          </div>
        );
      })}
    </div>
  );
}

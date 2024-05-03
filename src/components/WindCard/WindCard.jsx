import React, { useEffect, useState } from "react";
import "./WindCard.css";
import ConvertedTime from "../../utils/ConvertedTime";
import ConvertedSpeed from "../../utils/ConvertedSpeed";

export default function WindCard({ forecastData, unit }) {
  // State variable to control whether to show wind cards
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    // Set showCards to true when component mounts
    setShowCards(true);
  }, []);

  return (
    <div className="wind-container">
      {/* Map over forecast data to render wind cards */}
      {forecastData.list.slice(0, 8).map((data, index) => {
        // Get current hour using ConvertedTime function
        const { currentHour } = ConvertedTime(
          data.dt,
          forecastData.city.timezone
        );
        return (
          <div key={index} className={`wind-card ${showCards ? "show" : ""}`}>
            {/* Display wind speed using ConvertedSpeed function */}
            <p className="wind-speed">
              {ConvertedSpeed(data.wind.speed, unit).convertedSpeed}
            </p>
            {/* Render arrow indicating wind direction */}
            <div
              className="arrow-container"
              style={{
                transform: `rotate(${data.wind.deg - 180}deg)`,
              }}
            >
              <div className="arrow"></div>
              <div className="body-arrow"></div>
            </div>
            {/* Display current hour */}
            <p className="wind-speed">{currentHour}</p>
          </div>
        );
      })}
    </div>
  );
}

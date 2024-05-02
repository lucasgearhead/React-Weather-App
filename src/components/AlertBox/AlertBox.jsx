import React from "react";
import Search from "../Search/Search";
import "./AlertBox.css";

export default function AlertBox({ errorMessage, handleCity, weatherData }) {
  const fetchData = (value) => {
    handleCity(value);
  };
  return (
    <div className="alert-container">
      <div className="alert-box">
        <p className="alert-title">error</p>
        <p className="alert-message">{errorMessage.message}</p>
        {errorMessage.cod === "404" ? (
          <>
            <p className="alert-message">try again</p>
            <Search handleCity={fetchData} weatherData={weatherData} />
          </>
        ) : (
          <>
            <span className="try-again" onClick={fetchData}>
              <p>try again</p>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

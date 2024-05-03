import React from "react";
import Search from "../Search/Search";
import "./AlertBox.css";

export default function AlertBox({ errorMessage, handleCity, weatherData }) {
  // Function to fetch data for a new city
  const fetchData = (value) => {
    handleCity(value);
  };

  return (
    <div className="alert-container">
      {/* Alert box for displaying error message */}
      <div className="alert-box">
        <p className="alert-title">error</p>
        <p className="alert-message">{errorMessage.message}</p>
        {/* Check if the error is a 404 error */}
        {errorMessage.cod === "404" ? (
          <>
            {/* Display message for 404 error */}
            <p className="alert-message">try again</p>
            {/* Render the Search component for user input */}
            <Search handleCity={fetchData} weatherData={weatherData} />
          </>
        ) : (
          <>
            {/* Render try again button for other errors */}
            <span className="try-again" onClick={fetchData}>
              <p>try again</p>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

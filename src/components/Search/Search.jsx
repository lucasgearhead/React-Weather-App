import React, { useState, useEffect } from "react";
import "./Search.css";
import { IoIosSearch } from "react-icons/io";

export default function Search({ handleCity, weatherData }) {
  // State variable to store the input value
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Update input value when weatherData changes
    if (weatherData) {
      setInputValue(weatherData.name);
    }
  }, [weatherData]);

  // Handle key press event
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Call handleCity function and clear input value
      handleCity(inputValue);
      setInputValue("");
    }
  };

  // Handle search button click
  const searchButton = () => {
    // Call handleCity function and clear input value
    handleCity(inputValue);
    setInputValue("");
  };

  // Handle input change event
  const handleChange = (event) => {
    // Update input value
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      {/* Input field for city search */}
      <input
        type="text"
        placeholder={inputValue ? inputValue : "city name"}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {/* Search button */}
      <span onClick={searchButton}>
        <IoIosSearch className="search-icon" />
      </span>
    </div>
  );
}

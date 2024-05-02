import React, { useState, useEffect } from "react";
import "./Search.css";
import { IoIosSearch } from "react-icons/io";

export default function Search({ handleCity, weatherData }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (weatherData) {
      setInputValue(weatherData.name);
    }
  }, [weatherData]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCity(inputValue);
      setInputValue("");
    }
  };

  const searchButton = () => {
    handleCity(inputValue);
    setInputValue("");
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder={inputValue ? inputValue : "city name"}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <span onClick={searchButton}>
        <IoIosSearch className="search-icon" />
      </span>
    </div>
  );
}

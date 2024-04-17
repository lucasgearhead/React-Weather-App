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

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <IoIosSearch fontSize={"2em"} />
      <input
        type="text"
        className="city"
        placeholder="Your city"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

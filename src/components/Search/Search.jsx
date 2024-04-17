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
      <input
        type="text"
        placeholder="Your city"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <IoIosSearch fontSize={"2em"} />
    </div>
  );
}

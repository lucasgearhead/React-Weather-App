import React, { useState } from "react";
import "./Search.css";
import { IoIosSearch } from "react-icons/io";

export default function Search() {
  const [cityQuery, setCityQuery] = useState("");
  const [cityData, setCityData] = useState(null);

  const handleInputChange = (event) => {
    setCityQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=1871496f2ca4459545804dd8e8be545b`
      );
      const data = await response.json();
      setCityData(data);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
    alert(cityData.name);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="container">
      <IoIosSearch fontSize={"2em"} />
      <input
        type="text"
        className="city"
        placeholder="Your city"
        value={cityQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

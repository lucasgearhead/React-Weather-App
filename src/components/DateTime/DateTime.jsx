import React from "react";
import "./DateTime.css";
import Search from "../Search/Search";

export default function DateTime({ time, day }) {
  return (
    <div className="display">
      <div className="datetime">
        <p className="time">{time}</p>
        <p className="day">{day}</p>
      </div>
      <Search />
    </div>
  );
}

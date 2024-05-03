import { useEffect, useState } from "react";

export default function ConvertedSpeed(value, unit) {
  // State variable to store the converted speed
  const [convertedSpeed, setConvertedSpeed] = useState(value);

  useEffect(() => {
    // Convert speed based on selected unit
    if (unit === "metric") {
      // If metric unit, convert speed to kilometers per hour (km/h) and round to nearest integer
      setConvertedSpeed(`${parseInt(value * 3.624)} km/h`);
    } else if (unit === "imperial") {
      // If imperial unit, convert speed to miles per hour (mph) and round to nearest integer
      setConvertedSpeed(`${parseInt(value * 2.236)} mph`);
    }
  }, [value, unit]); // Update effect when value or unit changes

  // Return the converted speed
  return { convertedSpeed };
}

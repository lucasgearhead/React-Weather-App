import { useEffect, useState } from "react";

export default function ConvertedTemperature(value, unit) {
  // State variable to store the converted temperature
  const [convertedTemperature, setConvertedTemperature] = useState(value);

  useEffect(() => {
    // Convert temperature based on selected unit
    if (unit === "metric") {
      // If metric unit, round the temperature to the nearest integer
      setConvertedTemperature(Math.round(value));
    } else if (unit === "imperial") {
      // If imperial unit, convert temperature to Fahrenheit and round to the nearest integer
      setConvertedTemperature(Math.round((value * 9) / 5 + 32));
    }
  }, [value, unit]); // Update effect when value or unit changes

  // Return the converted temperature
  return { convertedTemperature };
}

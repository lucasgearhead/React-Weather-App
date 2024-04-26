import { useEffect, useState } from "react";

export default function ConvertedTemperature(value, unit) {
  const [convertedTemperature, setConvertedTemperature] = useState(value);

  useEffect(() => {
    if (unit === "metric") {
      setConvertedTemperature(Math.round(value));
    } else if (unit === "imperial") {
      setConvertedTemperature(Math.round((value * 9) / 5 + 32));
    }
  }, [value, unit]);

  return { convertedTemperature };
}

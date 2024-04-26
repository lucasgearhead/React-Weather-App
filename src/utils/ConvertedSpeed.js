import { useEffect, useState } from "react";

export default function ConvertedSpeed(value, unit) {
  const [convertedSpeed, setConvertedSpeed] = useState(value);

  useEffect(() => {
    if (unit === "metric") {
      setConvertedSpeed(`${parseInt(value * 3.624)} km/h`);
    } else if (unit === "imperial") {
      setConvertedSpeed(`${parseInt(value * 2.236)} mph`);
    }
  }, [value, unit]);
  return { convertedSpeed };
}

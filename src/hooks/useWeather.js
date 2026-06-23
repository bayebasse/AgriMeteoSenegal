import { useState } from "react";
import { getWeatherByCoords } from "../services/weatherService";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchWeather(lat, lon) {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByCoords(lat, lon);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { weather, loading, error, fetchWeather };
}



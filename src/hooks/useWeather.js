import { useState } from "react";
import { getWeatherByCoords } from "../services/weatherService";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCoords(lat, lon);
      setWeather(data);
    } catch (err) {
      setError("Impossible de charger la météo");
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    loading,
    error,
    fetchWeather,
  };
}
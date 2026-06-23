import { useState } from "react";
import { getWeatherByCoords } from "../services/weatherService";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon, retry = 2) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCoords(lat, lon);
      setWeather(data);
    } catch (err) {
      if (retry > 0) {
        // Retry automatique
        return fetchWeather(lat, lon, retry - 1);
      }

      setError("Impossible de récupérer la météo");
      setWeather(null);
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
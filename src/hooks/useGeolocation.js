import { useState } from "react";
import { getUserPosition } from "../services/geolocationService";

export function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const pos = await getUserPosition();
      setPosition(pos);
    } catch (err) {
      setError("Position non disponible");
    } finally {
      setLoading(false);
    }
  };

  return {
    position,
    loading,
    error,
    getLocation,
  };
}
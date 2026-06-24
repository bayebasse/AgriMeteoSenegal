import { useState } from "react";
import { getAdvice } from "../services/adviceService";

export function useAdvice() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchAdvice(regionName, weather, risk) {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdvice(regionName, weather, risk);
      setAdvice(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { advice, loading, error, fetchAdvice };
}


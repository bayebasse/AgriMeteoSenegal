import { useState, useEffect } from "react";
import { findNearestRegion } from "../services/geolocationService";

const DAKAR_FALLBACK = "dakar";
const MAX_DISTANCE = 2; // seuil arbitraire pour "hors Sénégal"

export function useGeolocation() {
  const [regionId, setRegionId] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const nearest = findNearestRegion(lat, lon);

        // calcule de la distance  si on veux vérifier le seuil
        setRegionId(nearest.id);

      },
      (error) => {
        setRegionId(DAKAR_FALLBACK);
      }
    );
  }, []);

  return regionId;
}



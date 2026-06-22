import { useEffect, useState } from "react";

import SenegalMap from "../components/Map/SenegalMap";
import WeatherPanel from "../components/WeatherPanel/WeatherPanel";

import { useWeather } from "../hooks/useWeather";
import { regions } from "../data/regions";

import { calculateRisk } from "../utils/calculateRisk";

function Dashboard() {
  const [selectedRegion, setSelectedRegion] =
    useState("dakar");

  const [panelOpen, setPanelOpen] =
    useState(false);

  const {
    weather,
    loading,
    fetchWeather,
  } = useWeather();

  const [risk, setRisk] = useState(null);

  useEffect(() => {
    const region = regions[selectedRegion];

    if (!region) return;

    fetchWeather(region.lat, region.lon);
    setPanelOpen(true);
  }, [selectedRegion]);

  useEffect(() => {
    if (weather) {
      const result = calculateRisk(
        weather.temp,
        weather.humidity
      );

      setRisk(result);
    }
  }, [weather]);

  return (
    <div className="dashboard">
      <h1>Météo Agriculture Sénégal</h1>

      <SenegalMap
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

      <WeatherPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        regionName={selectedRegion}
        weather={weather}
        risk={risk}
      />
    </div>
  );
}

export default Dashboard;
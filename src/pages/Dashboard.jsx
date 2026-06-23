import { useEffect, useState } from "react";

import SenegalMap from "../components/Map/SenegalMap";
import WeatherPanel from "../components/WeatherPanel/WeatherPanel";

import { useWeather } from "../hooks/useWeather";
import { regions } from "../data/regions";

import { calculateRisk } from "../utils/calculateRisk";

import "./Dashboard.css";


function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState("dakar");
  const [panelOpen, setPanelOpen] = useState(false);
  const {
  weather,
  loading,
  error,
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
    if (weather) setRisk(calculateRisk(weather.temp, weather.humidity));
  }, [weather]);

  return (
    <div className="dashboard">
      <div className="dashboard-topbar">
        <div className="db-logo">
          <div>
            <h1 className="db-logo-title">AgroMétéo Sénégal</h1>
          </div>
        </div>
    
      </div>

      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <nav className="db-nav">
            <div className="db-nav-item active">Carte météo</div>
            <div className="db-nav-item">Analyses</div>
            <div className="db-nav-item">Cultures</div>
            <div className="db-nav-item">Alertes</div>
          </nav>
        </aside>

        <main className="dashboard-main">
          
          <div className="dashboard-content">
            <div className="map-card">
              <div className="map-card-header">
                <span className="map-card-title">Carte des régions</span>
                <span className="db-badge">14 régions</span>
              </div>
              <SenegalMap
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
              />
            </div>

           <WeatherPanel
  isOpen={panelOpen}
  onClose={() => setPanelOpen(false)}
  regionName={regions[selectedRegion]?.name}
  weather={weather}
  risk={risk}
  loading={loading}
  error={error}
/>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
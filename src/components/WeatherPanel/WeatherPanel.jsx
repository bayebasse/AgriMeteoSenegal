import { useEffect } from "react";
import { senegalPaths } from "../../data/senegalPaths";
import { calculateRisk } from "../../utils/calculateRisk";
import RiskBadge from "../RiskBadge/RiskBadge";
import { useAdvice } from "../../hooks/useAdvice";
import "./WeatherPanel.css";

function WeatherPanel({ selectedRegion, weather, loading, error }) {
  if (!selectedRegion) {
    return null;
  }

  const region = senegalPaths.find((r) => r.id === selectedRegion);
  const risk = weather ? calculateRisk(weather.temp, weather.humidity) : null;
  const panelClass = risk && risk.score >= 35 ? "risk-high" : "risk-normal";

  const { advice, loading: loadingAdvice, error: errorAdvice, fetchAdvice } = useAdvice();

  useEffect(() => {
    if (weather && risk) {
      fetchAdvice(region.name, weather, risk);
    }
  }, [weather]);

  return (
    <div className={`weather-panel ${panelClass}`}>
      <div className="weather-panel-header">
        <span>Aujourd'hui</span>
      </div>

      {loading && <p>Chargement des données météo...</p>}
      {error && <p className="error">{error}</p>}

      {weather && !loading && !error && (
        <>
          <img
            className="weather-panel-icon"
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
          <div className="weather-panel-temp">{weather.temp}°</div>
          <div className="weather-panel-region">{region.name}</div>

          <div className="weather-panel-stats">
            <div>
              <div className="weather-panel-stat-label">Humidité</div>
              <div className="weather-panel-stat-value">{weather.humidity}%</div>
            </div>
            <div>
              <div className="weather-panel-stat-label">Condition</div>
              <div className="weather-panel-stat-value">{weather.description}</div>
            </div>
          </div>

          <RiskBadge risk={risk} />

          <div className="weather-panel-advice">
            {loadingAdvice && <p>Génération du conseil...</p>}
            {errorAdvice && <p className="error">Conseil indisponible</p>}
            {advice && !loadingAdvice && (
              <>
                <div className="weather-panel-advice-label">Conseil agricole</div>
                <p>{advice}</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherPanel;


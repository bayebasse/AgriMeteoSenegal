import { motion, AnimatePresence } from "framer-motion";

import RiskBadge from "../RiskBadge/RiskBadge";

import "./WeatherPanel.css";

function WeatherPanel({
  isOpen,
  onClose,
  regionName,
  weather,
  risk,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay sombre */}
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="weather-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
          >
            <div className="panel-header">
              <h2>{regionName}</h2>
              <button onClick={onClose}>✕</button>
            </div>

            {weather ? (
              <div className="panel-content">
                <div className="weather-main">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt="weather icon"
                  />

                  <h1>{weather.temp.toFixed(1)}°C</h1>
                </div>

                <p className="desc">
                  {weather.description}
                </p>

                <div className="details">
                  <p>💧 Humidité: {weather.humidity}%</p>
                  <p>🌬 Vent: {weather.wind} m/s</p>
                </div>

                {/* Risque agricole */}
                {risk && (
                  <RiskBadge risk={risk} />
                )}
              </div>
            ) : (
              <p>Chargement des données...</p>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default WeatherPanel;
import { motion, AnimatePresence } from "framer-motion";

import RiskBadge from "../RiskBadge/RiskBadge";

import "./WeatherPanel.css";
import PredictionChart from "../PredictionChart/PredictionChart";
import Loader from "../Loader/Loader";



function WeatherPanel({ isOpen,
  onClose,
  regionName,
  weather,
  risk,
  loading,
  error }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="weather-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="panel-header">
              <div className="panel-header-left">
                <div className="panel-header-location">
                  Sénégal
                </div>
                <h2>{regionName}</h2>
              </div>
              <button onClick={onClose} aria-label="Fermer">✕</button>
            </div>

            {loading ? (
  <Loader />
) : error ? (
  <p style={{ color: "red", padding: "20px" }}>
    {error}
  </p>
) : weather ? (
              <>
                <div className="weather-main">
                  <div className="weather-icon-wrap">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt="icône météo"
                    />
                  </div>
                  <div className="weather-temp-block">
                    <h1>{weather.temp.toFixed(1)}°C</h1>
                    <p className="desc">{weather.description}</p>
                  </div>
                </div>

                <div className="details">
                  <div className="detail-card">
                    <div className="detail-label">💧 Humidité</div>
                    <div className="detail-value">
                      {weather.humidity}<span className="detail-unit">%</span>
                    </div>
                  </div>
                  <div className="detail-card">
                    <div className="detail-label">🌬 Vent</div>
                    <div className="detail-value">
                      {weather.wind}<span className="detail-unit">m/s</span>
                    </div>
                  </div>
                </div>

                {risk && <RiskBadge risk={risk} />}
                <PredictionChart weather={weather} />
              </>
            ) : (
              <p style={{ color: "rgba(255,255,255,0.6)", padding: "20px" }}>
                Chargement des données...
              </p>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default WeatherPanel;
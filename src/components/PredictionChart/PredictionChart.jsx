import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { generatePrediction } from "../../utils/predictionGenerator";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PredictionChart({ weather }) {
  if (!weather) return null;

  const data7Days = generatePrediction(
    weather.temp,
    weather.humidity
  );

  const chartData = {
    labels: data7Days.map((d) => d.day),

    datasets: [
      {
        label: "Température (°C)",
        data: data7Days.map((d) => d.temp),
        borderColor: "#FF9800",
        backgroundColor: "#FF9800",
      },
      {
        label: "Humidité (%)",
        data: data7Days.map((d) => d.humidity),
        borderColor: "#1E88E5",
        backgroundColor: "#1E88E5",
      },
    ],
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Prévision 7 jours</h3>

      <Line data={chartData} />
    </div>
  );
}

export default PredictionChart;
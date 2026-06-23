import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { generateHistory } from "../../utils/predictionGenerator";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function WeatherChart({ currentTemp }) {
  if (!currentTemp) return null;

  const history = generateHistory(currentTemp);

  const data = {
    labels: history.map(h => h.day),
    datasets: [
      {
        label: "Température (°C)",
        data: history.map(t => t.temp),
        borderColor: "#2c7a4b",
      },
    ],
  };

  return <Line data={data} />;
}

export default WeatherChart;


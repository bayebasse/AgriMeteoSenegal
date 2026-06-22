export function calculateRisk(temp, humidity) {
  let score = 0;
  let label = "Risque Faible";
  let color = "#4CAF50";

  if (temp > 38 && humidity > 60) {
    score = 85;
    label = "Risque Canicule Élevé";
    color = "#FF4500";
  } else if (temp > 35) {
    score = 60;
    label = "Risque Chaleur";
    color = "#FF9800";
  } else if (humidity > 80) {
    score = 70;
    label = "Risque Humidité Élevée";
    color = "#2196F3";
  } else {
    score = 30;
    label = "Conditions Stables";
    color = "#4CAF50";
  }

  return { score, label, color };
}
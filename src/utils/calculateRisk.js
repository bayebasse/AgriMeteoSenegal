export function calculateRisk(temp, humidity) {
  if (temp > 38 && humidity > 60 ) {
    return { score: 85, label: "Risque Canicule Élevé", color: "#FF4500" };
  } else if (temp >= 30) {
    return { score: 25, label: "Vigilance", color: "#004666"};
  } else {
    return { score: 10, label: "Risque faible", color: "#CCC900" };
  }
}


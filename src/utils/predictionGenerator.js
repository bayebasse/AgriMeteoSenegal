export function generatePrediction(temp, humidity) {
  const days = 7;

  const data = [];

  for (let i = 0; i < days; i++) {
    const tempVariation =
      (Math.random() * 6 - 3).toFixed(1);

    const humidityVariation =
      (Math.random() * 10 - 5).toFixed(0);

    data.push({
      day: `J+${i + 1}`,
      temp:
        Number(temp) +
        Number(tempVariation),

      humidity:
        Number(humidity) +
        Number(humidityVariation),
    });
  }

  return data;
}
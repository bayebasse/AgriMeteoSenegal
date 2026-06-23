export function generateHistory(currentTemp) {
    
  const history = [];

  for (let i = 6; i >= 0; i--) {
    const variation = Math.random() * 6 - 3;

    history.push({
      day: `J-${i}`,
      temp: parseFloat((currentTemp + variation).toFixed(1)),
    });

  }

  return history;

}



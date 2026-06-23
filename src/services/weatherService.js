const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCoords(lat, lon) {
  try {
    // construction de l'URL
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    // condition d'échec
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données météo");
    }

    const data = await response.json();

    return {
      temp: data.main.temp,              // température
      humidity: data.main.humidity,      // humidité
      description: data.weather[0].description, // description météo
      icon: data.weather[0].icon,        // code icône
    };
  } catch (error) {
    console.error("Erreur API météo:", error); 
    throw error;
  }
}



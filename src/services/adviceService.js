const API_KEY = import.meta.env.VITE_OPENROUTER_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Construction du prompt
function buildPrompt(regionName, weather, risk) {
  return `
Tu es un conseiller agricole expert au Sénégal. 
Voici les conditions météo actuelles pour la région de ${regionName} :
- Température : ${weather.temp}°C
- Humidité : ${weather.humidity}%
- Conditions : ${weather.description}
- Niveau de risque climatique : ${risk.label} (score ${risk.score}/100)

Donne un conseil agricole professionnel et concret en 2 à 3 phrases courtes, 
en français, adapté à ces conditions précises. 
Ne fais pas d'introduction, donne directement le conseil.
`;
}

// Appel API
export async function getAdvice(regionName, weather, risk) {
  const prompt = buildPrompt(regionName, weather, risk);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'appel à l'API OpenRouter");
  }

  const data = await response.json();

  // Récupération du texte généré
  return data.choices[0].message.content;
}

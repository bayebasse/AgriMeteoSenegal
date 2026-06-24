# 🌾 AgriMétéo Sénégal

Plateforme de monitoring climatique destinée aux acteurs agricoles sénégalais (agriculteurs, coopératives, autorités locales). L'outil transforme les données météorologiques brutes en information décisionnelle via une carte interactive des 14 régions, un score de risque climatique et des conseils générés par IA.

**Démo en ligne :** [agrimeteo-sn.netlify.app](https://agrimeteo-sn.netlify.app/)

---

## Équipe

- Assane Ndong FALL
- Bassirou DIEYE

Projet réalisé en binôme, en pair-programming (alternance Driver/Navigator sur les fonctionnalités majeures : carte SVG, algorithme de risque, graphiques).

---

## Choix technologiques & architecture

### Stack

| Couche | Technologie |
|---|---|
| Framework | React (Vite) |
| Données météo | API OpenWeatherMap |
| Conseils IA | OpenRouter (modèle `openai/gpt-oss-20b:free`) |
| Graphiques | Chart.js (via `react-chartjs-2`) |
| Carte interactive | SVG natif (tracés simplifiés des régions, source Simplemaps.com) |
| Déploiement | Netlify |

### Architecture en couches (séparation stricte des responsabilités)

Le projet applique le principe de responsabilité unique : chaque dossier a un rôle précis, sans mélange entre logique métier et affichage.

```
src/
├── data/          # Données statiques (régions, tracés SVG) — aucune logique
│   ├── regions.js
│   └── senegalPaths.js
├── services/      # Appels réseau uniquement (API externes)
│   ├── weatherService.js     -> OpenWeatherMap
│   ├── geoService.js         -> calcul de la région la plus proche
│   └── adviceService.js      -> OpenRouter (conseils IA)
├── utils/         # Fonctions pures, sans React ni réseau
│   ├── riskCalculator.js     -> calculateRisk(temp, humidity)
│   └── generateHistory.js    -> simulation des 7 derniers jours
├── hooks/         # Pont entre la logique et React (état, cycle de vie)
│   ├── useWeather.js
│   ├── useGeolocation.js
│   └── useAdvice.js
└── components/    # Affichage uniquement (aucun calcul métier)
    ├── Map/
    ├── WeatherPanel/
    ├── RiskBadge/
    └── PredictionChart/
    └── WeatherChart/
```

**Règle appliquée** : un composant React ne contient jamais de logique de calcul. Par exemple, `RiskBadge` ne calcule jamais le risque lui-même — il reçoit un objet `{ score, label, color }` déjà calculé par `WeatherPanel` (via `riskCalculator.js`) et se contente de l'afficher. Cette séparation permet de tester et réutiliser chaque fonction métier indépendamment de l'interface.

---

## Logique métier : l'indice de risque climatique

La fonction pure `calculateRisk(temp, humidity)` (dans `utils/riskCalculator.js`) applique 3 paliers :

| Condition | Score | Label |
|---|---|---|
| `temp > 38` ET `humidity > 60` | 85 | Risque Canicule Élevé |
| `temp >= 30` | 25 | Vigilance |
| Sinon | 10 | Risque faible |

**Justification** : une forte chaleur combinée à une forte humidité empêche la sueur de s'évaporer correctement (mécanisme de refroidissement naturel du corps), ce qui crée le risque le plus critique — ce cas est donc testé en priorité. Le seuil de 30°C marque le début d'une vigilance même sans humidité aggravante.

**Limite connue** : ces seuils sont volontairement simples (3 paliers) pour rester explicables et maintenables dans le temps imparti. Une version future pourrait affiner la granularité (plus de paliers, pondération par culture agricole).

---

## Utilisation d'un LLM (conseil agricole automatisé)

**Choix justifié** : plutôt que d'écrire des règles statiques pour générer des conseils ("si température > X alors afficher tel texte"), on délègue cette génération à un LLM (`openai/gpt-oss-20b:free` via OpenRouter), qui reçoit les données météo + le score de risque déjà calculé en prompt, et génère un conseil contextualisé en français.

**Pourquoi ce choix est raisonnable en tant que développeur conscient** :
- Le modèle choisi est gratuit et open-weight (licence Apache 2.0), suffisant pour une tâche courte et peu critique
- Le LLM ne décide jamais du niveau de risque (ça reste une fonction pure déterministe, `calculateRisk`) — il ne fait que formuler un conseil textuel à partir d'un résultat déjà calculé, ce qui limite les risques d'hallucination sur les chiffres
- Le tier gratuit OpenRouter limite à 20 requêtes/minute, ce qui suffit pour une démo et un usage normal

**Limite connue** : la clé API OpenRouter est exposée côté client (`VITE_`) pour des raisons de simplicité et de délai. En production, elle devrait passer par une fonction serverless (proxy) pour ne jamais être visible dans le navigateur.

---

## Sécurité & variables d'environnement

Le projet utilise deux clés API, toutes deux exposées côté client via le préfixe `VITE_` (choix assumé, voir limites ci-dessus) :

```env
VITE_OPENWEATHER_KEY=ta_clé_openweathermap
VITE_OPENROUTER_KEY=ta_clé_openrouter
```

Un fichier `.env.example` est fourni dans le repository (sans les vraies clés) pour faciliter la configuration.

---

## Installation

```bash
# 1. Cloner le repository
git clone <url-du-repo>
cd agrimeteo-senegal

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Puis remplir .env avec tes propres clés API

# 4. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### Obtenir les clés API

- **OpenWeatherMap** : créer un compte sur [openweathermap.org](https://openweathermap.org/api) → section "API keys" (activation possible sous 1-2h après création)
- **OpenRouter** : créer un compte sur [openrouter.ai](https://openrouter.ai) → section "API Keys" (aucune carte bancaire requise pour les modèles gratuits)

---

## Fonctionnalités

- **Carte interactive** des 14 régions du Sénégal (survol, sélection persistante)
- **Géolocalisation automatique** au chargement (région la plus proche, repli sur Dakar si refus ou position hors Sénégal)
- **Météo en temps réel** par région (température, humidité, conditions)
- **Indice de risque climatique** calculé localement (badge coloré)
- **Historique simulé** des 7 derniers jours (graphique Chart.js)
- **Conseil agricole généré par IA**, contextualisé selon les conditions du jour
- **Gestion des erreurs et du chargement** (spinners, messages clairs, pas de crash en cas d'échec API)

---

## Vidéo de démonstration

À ajouter : lien vers la vidéo de démo du projet.

---

## Améliorations possibles

- Passage des clés API par un proxy serverless (sécurité renforcée)
- Calcul de distance GPS plus précis (formule de Haversine plutôt que la distance euclidienne actuelle)
- Granularité plus fine de l'indice de risque (paliers supplémentaires, pondération par type de culture)
- Mise en cache des réponses IA pour réduire le nombre d'appels API
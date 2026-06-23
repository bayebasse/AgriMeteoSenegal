import { regions } from "../data/regions";

function getDistance(lat1, lon1, lat2, lon2) {
  return Math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2);
}

export function findNearestRegion(lat, lon) {
  let nearest = regions[0];
  let minDistance = getDistance(lat, lon, regions[0].lat, regions[0].lon);

  for (let i = 1; i < regions.length; i++) {
    const distance = getDistance(lat, lon, regions[i].lat, regions[i].lon);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = regions[i];
    }
  }

  return nearest;
}


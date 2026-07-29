import { calculateDistance } from "../utils/distance";
import { distributors } from "./distributor";

export async function findNearestDistributor() {
  // Check browser support
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported.");
  }

  // Get user's current position
  // const position = await new Promise<GeolocationPosition>((resolve, reject) => {
  //   navigator.geolocation.getCurrentPosition(resolve, reject, {
  //     enableHighAccuracy: true,
  //     timeout: 10000,
  //     maximumAge: 0,
  //   });
  // });
  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        navigator.geolocation.clearWatch(watchId);
        resolve(position);
      },
      (error) => {
        navigator.geolocation.clearWatch(watchId);
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 300000,
      },
    );
  });

  const { latitude, longitude } = position.coords;

  let nearest = distributors[0];
  let nearestDistance = Infinity;

  for (const distributor of distributors) {
    const distance = calculateDistance(
      latitude,
      longitude,
      distributor.lat,
      distributor.lng,
    );

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = distributor;
    }
  }

  return {
    userLocation: {
      latitude,
      longitude,
    },
    distributor: nearest,
    distance: Number(nearestDistance.toFixed(2)),
  };
}

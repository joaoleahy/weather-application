import { toast } from "sonner";
import { City, WeatherData } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(`${API_URL}/city?city=${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error("Failed to find city weather data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather by city:", error);
    toast.error("Failed to get weather data");
    throw error;
  }
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(`${API_URL}/coords?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
      throw new Error("Weather data not available");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error);
    toast.error("Failed to get weather data");
    throw error;
  }
}

export async function getCitySuggestions(query: string): Promise<City[]> {
  if (!query || query.length < 3) {
    return [];
  }
  try {
    const response = await fetch(`${API_URL}/cities?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Failed to get city suggestions");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
}

export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  });
}


import { WeatherData, City } from '../types';

export function formatWeatherData(data: any): WeatherData {
  return {
    city: data.name,
    country: data.sys.country,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    temp: data.main.temp,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    pressure: data.main.pressure,
    visibility: data.visibility,
    clouds: data.clouds.all,
    timestamp: data.dt,
    timezone: data.timezone,
  };
}

export function formatCityData(data: any): City {
  return {
    name: data.name,
    country: data.country,
    state: data.state || '',
    lat: data.lat,
    lon: data.lon,
  };
}

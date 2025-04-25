import axios from 'axios';
import { formatWeatherData, formatCityData } from '../utils';
import { City, WeatherData } from '../types';
import { config } from '../config';

export const weatherService = {
  async getWeatherByCity(city: string): Promise<WeatherData> {
    const geoResponse = await axios.get(`${config.openWeatherMapGeoUrl}/direct`, {
      params: {
        q: city,
        limit: 1,
        appid: config.openWeatherMapApiKey
      }
    });

    if (!geoResponse.data || geoResponse.data.length === 0) {
      throw new Error(`City "${city}" not found`);
    }

    return this.getWeatherByCoords(geoResponse.data[0].lat, geoResponse.data[0].lon);
  },

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    const response = await axios.get(`${config.openWeatherMapBaseUrl}/weather`, {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: config.openWeatherMapApiKey
      }
    });

    return formatWeatherData(response.data);
  },

  async getCitySuggestions(query: string): Promise<City[]> {
    if (!query || query.length < 3) {
      return [];
    }

    const response = await axios.get(`${config.openWeatherMapGeoUrl}/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: config.openWeatherMapApiKey
      }
    });

    return response.data.map((city: any) => formatCityData(city));
  }
};

import { Request, Response } from 'express';
import { weatherService } from '../services/weatherService';

export const weatherController = {
  async getWeatherByCity(req: Request, res: Response) {
    const city = req.query.city as string;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    
    try {
      const weatherData = await weatherService.getWeatherByCity(city);
      res.json(weatherData);
    } catch (error: any) {
      console.error('Error fetching weather by city:', error);
      res.status(error.message.includes('not found') ? 404 : 500)
        .json({ error: error.message || 'Failed to fetch weather data' });
    }
  },
  
  async getWeatherByCoords(req: Request, res: Response) {
    const lat = parseFloat(req.query.lat as string);
    const lon = parseFloat(req.query.lon as string);
    
    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: 'Valid latitude and longitude parameters are required' });
    }
    
    try {
      const weatherData = await weatherService.getWeatherByCoords(lat, lon);
      res.json(weatherData);
    } catch (error: any) {
      console.error('Error fetching weather by coordinates:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch weather data' });
    }
  },
  
  async getCitySuggestions(req: Request, res: Response) {
    const query = req.query.query as string;
    
    if (!query || query.length < 3) {
      return res.status(400).json({ error: 'Query must be at least 3 characters long' });
    }
    
    try {
      const cities = await weatherService.getCitySuggestions(query);
      res.json(cities);
    } catch (error: any) {
      console.error('Error fetching city suggestions:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch city suggestions' });
    }
  }
};

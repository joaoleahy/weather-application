import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  openWeatherMapApiKey: process.env.OPENWEATHERMAP_API_KEY || '',
  openWeatherMapBaseUrl: 'https://api.openweathermap.org/data/2.5',
  openWeatherMapGeoUrl: 'https://api.openweathermap.org/geo/1.0'
};

if (!config.openWeatherMapApiKey) {
  console.error('OPENWEATHERMAP_API_KEY is not defined in .env file');
  process.exit(1);
}

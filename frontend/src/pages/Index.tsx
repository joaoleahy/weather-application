

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { 
  getWeatherByCity, 
  getWeatherByCoords, 
  getCurrentLocation,
} from '../services/weatherService';

import { WeatherData, City } from '../types';

const Index: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  useEffect(() => {
    const getInitialWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        
        const data = await getWeatherByCoords(latitude, longitude);
        setWeather(data);
        toast.success(`Weather loaded for ${data.city}`);
      } catch (err) {
        console.error('Error getting initial weather:', err);
        
        try {
          const data = await getWeatherByCity('London');
          setWeather(data);
          toast.info('Using default location: London');
        } catch (fallbackErr) {
          setError('Could not load weather data. Please search for a city.');
        }
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    getInitialWeather();
  }, []);

  useEffect(() => {
    if (weather) {
      const isNight = new Date((weather.timestamp + weather.timezone) * 1000).getUTCHours() < 6 
        || new Date((weather.timestamp + weather.timezone) * 1000).getUTCHours() >= 18;
      document.body.className = isNight ? 'night' : 'day';
      setIsNightMode(isNight);
    }
  }, [weather]);

  const handleCitySelect = async (city: City) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getWeatherByCoords(city.lat, city.lon);
      setWeather(data);
      toast.success(`Weather loaded for ${data.city}`);
    } catch (err) {
      console.error('Error getting weather for selected city:', err);
      setError('Could not load weather data for this city. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = async () => {
    try {
      setLoading(true);
      setError(null);
      toast.info('Getting your current location...');
      
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      
      const data = await getWeatherByCoords(latitude, longitude);
      setWeather(data);
      toast.success(`Weather loaded for ${data.city}`);
    } catch (err) {
      console.error('Error getting location:', err);
      
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location access denied. Please enable location services or search manually.');
            toast.error('Location access denied');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information is unavailable. Please search manually.');
            toast.error('Location unavailable');
            break;
          case err.TIMEOUT:
            setError('Location request timed out. Please search manually.');
            toast.error('Location request timed out');
            break;
          default:
            setError('An unknown error occurred. Please search manually.');
            toast.error('Failed to get location');
        }
      } else {
        setError('Failed to get weather data. Please try again.');
        toast.error('Failed to get weather data');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 px-4 sm:px-6 md:pt-12">
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className={`text-3xl font-bold ${isNightMode ? 'text-white' : 'text-gray-800'} mb-2`}>Weather App</h1>
          <p className={isNightMode ? 'text-gray-300' : 'text-gray-600'}>Get current weather for any location</p>
        </header>
        
        <SearchBar 
          onCitySelect={handleCitySelect} 
          onLocationRequest={handleLocationRequest} 
        />
        
        {error && <ErrorMessage message={error} />}
        
        {loading ? (
          <LoadingSpinner />
        ) : weather ? (
          <WeatherDisplay data={weather} />
        ) : !initialLoad && (
          <div className="weather-card text-center py-12">
            <p className="text-gray-500">
              No weather data available. Please search for a city.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { 
  convertToFahrenheit, 
  convertToMph, 
  isNightTime as checkIsNightTime 
} from '../utils';

export const useWeatherUtils = (tempC: number) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [isKmh, setIsKmh] = useState(true);

  const toFahrenheit = (celsius: number) => Math.round(convertToFahrenheit(celsius));
  const getDisplayTemp = () => isCelsius ? Math.round(tempC) : toFahrenheit(tempC);
  
  const msToKmh = (ms: number) => Math.round(ms * 3.6);
  
  const getDisplayWindSpeed = (windSpeedMs: number) => {
    const windSpeedKmh = msToKmh(windSpeedMs);
    return {
      value: isKmh ? windSpeedKmh : Math.round(convertToMph(windSpeedKmh)),
      unit: isKmh ? 'km/h' : 'mph'
    };
  };
  
  const getDisplayVisibility = (visibilityKm: number) => {
    return {
      value: isKmh ? Math.round(visibilityKm) : Math.round(visibilityKm * 0.621371),
      unit: isKmh ? 'km' : 'mi'
    };
  };
  
  const isNightTime = (timestamp: number, timezone: number) => {
    return checkIsNightTime(timestamp, timezone);
  };

  return {
    isCelsius,
    setIsCelsius,
    isKmh,
    setIsKmh,
    getDisplayTemp,
    toFahrenheit,
    getDisplayWindSpeed,
    getDisplayVisibility,
    isNightTime
  };
};
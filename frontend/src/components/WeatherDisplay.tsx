import React from 'react';
import { WeatherData } from '../types';
import WeatherIcon from './WeatherIcon';
import { useWeatherUtils } from '../hooks/useWeatherUtils';
import { 
  Droplet, 
  Wind, 
  Compass, 
  Eye, 
  Gauge,
  ThermometerSun,
  ThermometerSnowflake,
  ArrowDown,
  ArrowUp,
  Sun,
  Moon,
  ArrowRightLeft
} from 'lucide-react';
import { Toggle } from './ui/toggle';

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const { 
    isCelsius, 
    setIsCelsius, 
    isKmh, 
    setIsKmh, 
    getDisplayTemp, 
    toFahrenheit, 
    getDisplayWindSpeed,
    getDisplayVisibility,
    isNightTime 
  } = useWeatherUtils(data.temp);
  
  const isNight = isNightTime(data.timestamp, data.timezone);
  const displayTemp = getDisplayTemp();
  const windSpeedDisplay = getDisplayWindSpeed(data.windSpeed);
  const visibilityDisplay = getDisplayVisibility(data.visibility / 1000);

  const formatDateTime = () => {
    const date = new Date((data.timestamp + data.timezone) * 1000);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  };

  const capitalize = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  };

  return (
    <div className={`weather-card transition-all duration-500 pb-10 ${
      isNight ? 'bg-slate-800/90 text-white' : 'bg-white/90'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-semibold ${
            isNight ? 'text-white' : 'text-gray-800'
          }`}>
            {data.city}, {data.country}
          </h1>
          <p className={`text-sm ${isNight ? 'text-gray-300' : 'text-gray-500'}`}>
            {formatDateTime()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <WeatherIcon 
            iconCode={data.icon} 
            size={38} 
            className={isNight ? 'text-white' : 'text-weather-blue'} 
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between mb-4">
          <div className="flex items-start">
            <span className="text-5xl font-bold">{displayTemp}</span>
            <span className="text-xl mt-1 ml-1">°{isCelsius ? 'C' : 'F'}</span>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 mt-1">
              <ArrowUp size={16} />
              <span>
                {isCelsius ? Math.round(data.tempMax) : toFahrenheit(data.tempMax)}°
                {isCelsius ? 'C' : 'F'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowDown size={16} />
              <span>
                {isCelsius ? Math.round(data.tempMin) : toFahrenheit(data.tempMin)}°
                {isCelsius ? 'C' : 'F'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-start gap-2 mb-4">
          <Toggle
            aria-label="Toggle temperature unit"
            pressed={!isCelsius}
            onPressedChange={() => setIsCelsius(!isCelsius)}
            className={`py-1 px-3 h-auto ${isNight ? 'bg-slate-700/50 hover:bg-slate-600' : 'bg-blue-50 hover:bg-blue-100'} flex items-center gap-1`}
          >
            <span className="mr-1">°C</span>
            <ArrowRightLeft size={14} />
            <span className="ml-1">°F</span>
          </Toggle>
          
          <Toggle
            aria-label="Toggle wind speed unit"
            pressed={!isKmh}
            onPressedChange={() => setIsKmh(!isKmh)}
            className={`py-1 px-3 h-auto ${isNight ? 'bg-slate-700/50 hover:bg-slate-600' : 'bg-blue-50 hover:bg-blue-100'} flex items-center gap-1`}
          >
            <span className="mr-1">km/h</span>
            <ArrowRightLeft size={14} />
            <span className="ml-1">mph</span>
          </Toggle>
        </div>
        
        <p className={`${isNight ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
          Feels like {isCelsius ? Math.round(data.feelsLike) : toFahrenheit(data.feelsLike)}°{isCelsius ? 'C' : 'F'}
        </p>
        <p className={`${isNight ? 'text-gray-200' : 'text-gray-700'} font-medium mt-2`}>
          {capitalize(data.description)}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <WeatherStat 
          icon={<Droplet />}
          label="Humidity"
          value={`${data.humidity}%`}
          isNight={isNight}
        />
        <WeatherStat 
          icon={<Wind />}
          label="Wind Speed"
          value={`${windSpeedDisplay.value} ${windSpeedDisplay.unit}`}
          isNight={isNight}
        />
        <WeatherStat 
          icon={<Compass />}
          label="Pressure"
          value={`${data.pressure} hPa`}
          isNight={isNight}
        />
        <WeatherStat 
          icon={<Eye />}
          label="Visibility"
          value={`${visibilityDisplay.value} ${visibilityDisplay.unit}`}
          isNight={isNight}
        />
        <WeatherStat 
          icon={<Gauge />}
          label="Wind Direction"
          value={`${data.windDeg}°`}
          isNight={isNight}
        />
        <WeatherStat 
          icon={data.clouds > 50 ? <ThermometerSnowflake /> : <ThermometerSun />}
          label="Cloud Cover"
          value={`${data.clouds}%`}
          isNight={isNight}
        />
      </div>
    </div>
  );
};

interface WeatherStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isNight: boolean;
  action?: React.ReactNode;
}

const WeatherStat: React.FC<WeatherStatProps> = ({ icon, label, value, isNight, action }) => (
  <div className={`rounded-xl p-3 flex items-center ${
    isNight ? 'bg-slate-700/50' : 'bg-blue-50'
  }`}>
    <div className={`h-5 w-5 mr-2 ${
      isNight ? 'text-blue-300' : 'text-blue-500'
    }`}>
      {icon}
    </div>
    <div className="flex flex-col flex-1">
      <p className={`text-xs ${
        isNight ? 'text-gray-300' : 'text-gray-500'
      }`}>{label}</p>
      <div className="font-medium flex items-center">
        {value}
        {action}
      </div>
    </div>
  </div>
);

export default WeatherDisplay;

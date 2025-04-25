import React from 'react';
import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun,
  CloudSun,
  Moon,
  CloudMoon,
  Wind
} from 'lucide-react';

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  color?: string;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  iconCode, 
  size = 24, 
  color = "currentColor",
  className = ""
}) => {
  const getIcon = () => {
    if (iconCode.endsWith('n')) {
      switch (iconCode) {
        case '01n': return <Moon size={size} color={color} />;
        case '02n': return <CloudMoon size={size} color={color} />;
        case '03n':
        case '04n': return <Cloud size={size} color={color} />;
        case '09n': return <CloudDrizzle size={size} color={color} />;
        case '10n': return <CloudRain size={size} color={color} />;
        case '11n': return <CloudLightning size={size} color={color} />;
        case '13n': return <CloudSnow size={size} color={color} />;
        case '50n': return <CloudFog size={size} color={color} />;
        default: return <CloudMoon size={size} color={color} />;
      }
    }
    
    switch (iconCode) {
      case '01d': return <Sun size={size} color={color} />;
      case '02d': return <CloudSun size={size} color={color} />;
      case '03d':
      case '04d': return <Cloud size={size} color={color} />;
      case '09d': return <CloudDrizzle size={size} color={color} />;
      case '10d': return <CloudRain size={size} color={color} />;
      case '11d': return <CloudLightning size={size} color={color} />;
      case '13d': return <CloudSnow size={size} color={color} />;
      case '50d': return <CloudFog size={size} color={color} />;
      default: return <Sun size={size} color={color} />;
    }
  };

  return (
    <div className={className}>
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;

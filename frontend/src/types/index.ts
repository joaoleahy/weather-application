export interface City {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  city: string;
  country: string;
  description: string;
  icon: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  visibility: number;
  clouds: number;
  timestamp: number;
  timezone: number;
}

export interface WeatherDisplayProps {
  data: WeatherData;
}

export interface WeatherStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isNight: boolean;
  action?: React.ReactNode;
}

export interface SearchBarProps {
  onCitySelect: (city: City) => void;
  onLocationRequest: () => void;
}
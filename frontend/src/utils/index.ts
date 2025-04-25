export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export function convertToMph(kmh: number): number {
  return kmh * 0.621371;
}

export function convertToMiles(km: number): number {
  return km * 0.621371;
}

export function formatTemperature(temp: number, isCelsius: boolean): string {
  return `${Math.round(isCelsius ? temp : convertToFahrenheit(temp))}°${isCelsius ? 'C' : 'F'}`;
}

export function formatWindSpeed(speed: number, isKmh: boolean): string {
  return `${Math.round(isKmh ? speed : convertToMph(speed))} ${isKmh ? 'km/h' : 'mph'}`;
}

export function formatVisibility(visibility: number, isKm: boolean): string {
  return `${isKm ? visibility : convertToMiles(visibility).toFixed(1)} ${isKm ? 'km' : 'mi'}`;
}

export function isNightTime(timestamp: number, timezone: number): boolean {
  const date = new Date((timestamp + timezone) * 1000);
  const hours = date.getUTCHours();
  return hours < 6 || hours > 18;
}

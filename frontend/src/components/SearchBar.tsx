import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { getCitySuggestions } from '../services/weatherService';
import { City } from '../types';
import { toast } from 'sonner';

interface SearchBarProps {
  onCitySelect: (city: City) => void;
  onLocationRequest: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect, onLocationRequest }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const cities = await getCitySuggestions(query);
        setSuggestions(cities);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: City) => {
    const displayName = city.state 
      ? `${city.name}, ${city.state}, ${city.country}` 
      : `${city.name}, ${city.country}`;
    setQuery(displayName);
    setShowSuggestions(false);
    onCitySelect(city);
  };

  const handleLocationClick = () => {
    onLocationRequest();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleCitySelect(suggestions[0]);
    } else if (query.length > 2) {
      toast.error("Please select a city from the suggestions");
    }
  };

  return (
    <div className="relative mb-6" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          className="search-input pl-10 pr-12"
          placeholder="Search for a city..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 3 && setShowSuggestions(true)}
        />
        <button 
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-weather-blue hover:text-blue-700 transition-colors"
          onClick={handleLocationClick}
          title="Use your current location"
        >
          <MapPin size={20} />
        </button>
      </form>

      {showSuggestions && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500">Loading suggestions...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((city, index) => (
                <li 
                  key={`${city.name}-${city.country}-${index}`}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm transition-colors"
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="font-medium">{city.name}</div>
                  <div className="text-xs text-gray-500">
                    {city.state ? `${city.state}, ${city.country}` : city.country}
                  </div>
                </li>
              ))}
            </ul>
          ) : query.length >= 3 ? (
            <div className="px-4 py-3 text-sm text-gray-500">No cities found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
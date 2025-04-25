
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="h-8 w-8 border-4 border-t-weather-blue border-r-transparent border-b-weather-blue border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
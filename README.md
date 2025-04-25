# Weather Application

A modern web application for weather conditions, developed with TypeScript, React, and Node.js.

## Overview

The Weather Application allows users to:
- Search for weather information by city name
- Get weather data based on current location
- View details such as temperature, humidity, wind speed, and weather conditions
- Toggle between metric and imperial units

## Technologies Used

### Frontend
- React with TypeScript
- Vite as bundler
- Tailwind CSS and shadcn/ui for interface components
- React Hook Form for form management
- Axios for HTTP requests

### Backend
- Node.js with TypeScript
- Express for HTTP server
- Axios for consuming the OpenWeatherMap API
- Modular architecture with controllers, services, and utils

## Project Structure

```
weather-application/
├── frontend/             # React Application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Application pages
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
│   └── ...
└── backend/              # Node.js/Express Server
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── routes/       # Route definitions
    │   ├── services/     # Business services
    │   ├── types/        # TypeScript type definitions
    │   └── utils/        # Utility functions
    └── ...
```

## Setup and Local Execution

### Prerequisites
- Node.js 18+ installed
- OpenWeatherMap API key (get it from [OpenWeatherMap](https://openweathermap.org/api))

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file and add your OpenWeatherMap API key:
   ```
   OPENWEATHERMAP_API_KEY=your_key_here
   PORT=5000
   ```

5. Run the server in development mode:
   ```bash
   npm run dev
   ```

   The server will be available at `http://localhost:5000`.

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file to point to the backend:
   ```
   VITE_API_URL=http://localhost:5000/api/weather
   ```

5. Run the application in development mode:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## API Endpoints

### Backend

- `GET /api/weather/cities?query={cityName}` - Get city suggestions
- `GET /api/weather/city?city={cityName}` - Get weather data by city name
- `GET /api/weather/coords?lat={latitude}&lon={longitude}` - Get weather data by coordinates
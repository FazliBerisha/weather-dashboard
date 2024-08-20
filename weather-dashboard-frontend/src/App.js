// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherMap from './components/WeatherMap';
import WeatherCharts from './components/WeatherCharts';
import Forecast from './components/Forecast';
import getWeatherIcon from './utils/weatherIcons';
import './App.css';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('London');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
    fetchForecastData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/weather/${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  const fetchForecastData = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/forecast/${city}`);
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      setError('Failed to fetch forecast data. Please try again.');
      setForecastData(null);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
    fetchForecastData();
  };

  return (
    <div className="App">
      <header>
        <h1>Weather Dashboard</h1>
      </header>
      <main>
        <section className="search-section">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city name"
            />
            <button type="submit">Search</button>
          </form>
        </section>
        {error && <p className="error-message">{error}</p>}
        {weatherData && (
          <div className="dashboard-container">
            <section className="weather-info">
              <h2>{weatherData.city}</h2>
              <div className="current-weather">
                <i className={`wi ${getWeatherIcon(weatherData.description)} weather-icon`}></i>
                <div className="current-weather-details">
                  <p className="temperature">{weatherData.temperature.toFixed(1)}°C</p>
                  <p className="description">{weatherData.description}</p>
                </div>
              </div>
              <div className="additional-info">
                <p>Humidity: {weatherData.humidity}%</p>
                <p>Wind Speed: {weatherData.wind_speed} m/s</p>
              </div>
            </section>
            {weatherData && weatherData.lat && weatherData.lon && (
              <section className="weather-map">
                <h3>Location</h3>
                <WeatherMap 
                  lat={weatherData.lat} 
                  lon={weatherData.lon} 
                  city={weatherData.city} 
                />
              </section>
            )}
            <section className="weather-charts">
              <WeatherCharts 
                currentTemp={weatherData.temperature}
                currentHumidity={weatherData.humidity}
                forecastData={forecastData}
              />
            </section>
            {forecastData && (
              <section className="forecast">
                <Forecast forecastData={forecastData} />
              </section>
            )}
          </div>
        )}
      </main>
      <footer>
        <p>© 2024 Weather Dashboard</p>
      </footer>
    </div>
  );
}

export default App;

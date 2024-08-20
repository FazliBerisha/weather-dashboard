// src/components/Forecast.js

import React from 'react';
import getWeatherIcon from '../utils/weatherIcons';

function Forecast({ forecastData }) {
  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {forecastData.map((day, index) => (
          <div key={index} className="forecast-item">
            <h4>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</h4>
            <i className={`wi ${getWeatherIcon(day.description)} weather-icon`}></i>
            <p className="temperature">{day.temperature.toFixed(1)}°C</p>
            <p className="description">{day.description}</p>
            <p>Humidity: {day.humidity}%</p>
            <p>Wind: {day.wind_speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
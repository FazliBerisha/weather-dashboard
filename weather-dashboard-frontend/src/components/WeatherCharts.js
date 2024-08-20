// src/components/WeatherCharts.js

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function WeatherCharts({ currentTemp, currentHumidity, forecastData }) {
  // Prepare data for the 5-day forecast chart
  const chartData = forecastData ? forecastData.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    temperature: day.temperature
  })) : [];

  return (
    <div className="weather-charts">
      <h3>Weather Trends</h3>
      <div className="chart-container">
        <h4>Current Weather</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[{ name: 'Current', temperature: currentTemp, humidity: currentHumidity }]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
            <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {forecastData && forecastData.length > 0 && (
        <div className="chart-container">
          <h4>5-Day Temperature Forecast</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default WeatherCharts;
# app.py

from flask import Flask, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os
import random
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# OpenWeatherMap API key
API_KEY = os.getenv('OPENWEATHER_API_KEY')
print(f"API Key: {API_KEY}")  # Print API key for debugging

USE_MOCK_DATA = False  # Set this to False when your API key is working

@app.route('/')
def home():
    return "Weather Dashboard API is running!"

def get_mock_weather(city):
    return {
        'city': city,
        'temperature': round(random.uniform(0, 30), 2),
        'description': random.choice(['Sunny', 'Cloudy', 'Rainy', 'Windy']),
        'humidity': random.randint(30, 90),
        'wind_speed': round(random.uniform(0, 20), 2),
        'lat': round(random.uniform(-90, 90), 6),
        'lon': round(random.uniform(-180, 180), 6)
    }

def get_mock_forecast(city):
    forecast = []
    for i in range(5):
        date = (datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d')
        forecast.append({
            'date': date,
            'temperature': round(random.uniform(0, 30), 2),
            'description': random.choice(['Sunny', 'Cloudy', 'Rainy', 'Windy']),
            'humidity': random.randint(30, 90),
            'wind_speed': round(random.uniform(0, 20), 2)
        })
    return forecast

@app.route('/weather/<city>')
def get_weather(city):
    if USE_MOCK_DATA:
        return jsonify(get_mock_weather(city))
    
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {
        'q': city,
        'appid': API_KEY,
        'units': 'metric'  # For Celsius
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        data = response.json()
        weather_data = {
            'city': data['name'],
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
            'humidity': data['main']['humidity'],
            'wind_speed': data['wind']['speed'],
            'lat': data['coord']['lat'],
            'lon': data['coord']['lon']
        }
        return jsonify(weather_data)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return jsonify({'error': f'Failed to fetch weather data: {str(e)}'}), 500

@app.route('/forecast/<city>')
def get_forecast(city):
    if USE_MOCK_DATA:
        return jsonify(get_mock_forecast(city))
    
    base_url = "http://api.openweathermap.org/data/2.5/forecast"
    params = {
        'q': city,
        'appid': API_KEY,
        'units': 'metric'  # For Celsius
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        data = response.json()
        forecast = []
        for item in data['list']:
            date = datetime.fromtimestamp(item['dt']).strftime('%Y-%m-%d')
            if len(forecast) == 0 or forecast[-1]['date'] != date:
                forecast.append({
                    'date': date,
                    'temperature': item['main']['temp'],
                    'description': item['weather'][0]['description'],
                    'humidity': item['main']['humidity'],
                    'wind_speed': item['wind']['speed']
                })
            if len(forecast) == 5:
                break
        
        return jsonify(forecast)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching forecast data: {e}")
        return jsonify({'error': f'Failed to fetch forecast data: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
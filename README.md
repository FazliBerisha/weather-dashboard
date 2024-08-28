# Weather Dashboard

## Overview
Weather Dashboard is a full-stack web application that provides real-time weather information and forecasts for cities around the world. It features a clean, intuitive interface with interactive maps and charts, offering users a comprehensive view of current and future weather conditions.

## Features
- **Current Weather Display**: Shows temperature, humidity, wind speed, and weather description for the selected city.
- **5-Day Weather Forecast**: Provides a detailed forecast for the next five days.
- **Interactive Weather Map**: Displays the geographical location of the selected city.
- **Weather Trend Charts**: Visualizes temperature and humidity trends.
- **Responsive Design**: Ensures a seamless experience across various devices and screen sizes.

## Technologies Used
- **Frontend**: 
  - React.js
  - Recharts for data visualization
  - Leaflet for interactive maps
  - Weather Icons for weather symbols
- **Backend**: 
  - Flask (Python)
  - OpenWeatherMap API for weather data
- **Styling**: CSS3 with custom properties

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js and npm installed
- Python 3.7 or higher installed
- An OpenWeatherMap API key

## Setup and Installation

### Backend Setup
1. Navigate to the project root directory.
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
4. Install the required Python packages:
   ```
   pip install flask python-dotenv requests flask-cors
   ```
5. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

### Frontend Setup
1. Navigate to the `weather-dashboard-frontend` directory.
2. Install the required npm packages:
   ```
   npm install
   ```

## Running the Application

1. Start the Flask backend:
   - In the root directory, with the virtual environment activated, run:
     ```
     python app.py
     ```
   - The backend should start running on `http://127.0.0.1:5000/`

2. Start the React frontend:
   - In a new terminal, navigate to the `weather-dashboard-frontend` directory and run:
     ```
     npm start
     ```
   - The frontend should start and automatically open in your default web browser at `http://localhost:3000`

## Usage
- Enter a city name in the search bar and press enter or click the search button.
- View the current weather, forecast, map, and weather trends for the selected city.
- Explore the interactive map and charts for more detailed information.

## Contributing
Contributions to the Weather Dashboard project are welcome. Please feel free to fork the repository, make changes, and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Maps powered by [Leaflet](https://leafletjs.com/)
- Charts created with [Recharts](https://recharts.org/)
- Weather icons by [Weather Icons](https://erikflowers.github.io/weather-icons/)

## Contact
If you have any questions or feedback, please open an issue in the GitHub repository.

---

Happy weather tracking!

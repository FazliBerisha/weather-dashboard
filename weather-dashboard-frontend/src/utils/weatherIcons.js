// src/utils/weatherIcons.js

const getWeatherIcon = (description) => {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes('clear')) return 'wi-day-sunny';
    if (lowerDesc.includes('cloud')) return 'wi-cloudy';
    if (lowerDesc.includes('rain')) return 'wi-rain';
    if (lowerDesc.includes('snow')) return 'wi-snow';
    if (lowerDesc.includes('thunder')) return 'wi-thunderstorm';
    if (lowerDesc.includes('wind')) return 'wi-windy';
    return 'wi-day-cloudy'; // default icon
  };
  
  export default getWeatherIcon;
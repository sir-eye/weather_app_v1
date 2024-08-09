import React, { useState } from 'react';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Imperial&appid=a14630faea629db712fa54bc0ff249e6`);
    const data = await response.json();
    setWeather(data);
  };

  return (
    <div className="weather-container">
      <h2>Search Weather</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && (
        <div className="weather-data">
          <h3>Weather in {weather.name}</h3>
          <p>Temperature: {weather.main.temp} °F</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

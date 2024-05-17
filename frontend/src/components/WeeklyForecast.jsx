// src/components/WeeklyForecast.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const WeeklyForecast = ({ lat, lon }) => {
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyForecast = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${api_key}&units=metric`
        );
        setWeeklyForecast(response.data.daily);
      } catch (error) {
        setError("Failed to fetch weekly forecast data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyForecast();
  }, [lat, lon]);

  return (
    <div className="weekly-forecast">
      <h2>Weekly Forecast</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <ul>
          {weeklyForecast.map((day, index) => (
            <li key={index}>
              <span>Date: {new Date(day.dt * 1000).toLocaleDateString()}</span>
              <span>Temperature: {day.temp.day}°C</span>
              <span>Weather: {day.weather[0].description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

WeeklyForecast.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default WeeklyForecast;

import React, { useState, useEffect } from "react";
import "../App.css";
import PropTypes from "prop-types";

import searchIcon from "../assets/images/searchIcon.png";
import rainIcon from "../assets/images/rain.png";
import humidityIcon from "../assets/images/humidity.png";
import windIcon from "../assets/images/wind.png";
import clearIcon from "../assets/images/01d.png";
import { useNavigate, Link } from "react-router-dom";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  lon,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lon">Longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
};

function Home() {
  let api_key = "3e300226fbc4166b4406944649456fcd";
  const [text, setText] = useState("COLOMBO");
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Colombo");
  const [country, setCountry] = useState("SL");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextThreeDaysForecast, setNextThreeDaysForecast] = useState([]);

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      //console.log(data);
      if (data.cod === "404") {
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.error("An error occured: ", error.message);
      setError("An error occured while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchNextThreeDaysForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${text}&appid=${api_key}&units=Metric`
      );
      const forecastData = response.data.list.slice(0, 8 * 3); // 8 forecasts per day for 3 days
      setNextThreeDaysForecast(forecastData);
    } catch (error) {
      console.error(
        "An error occured while fetching forecast data: ",
        error.message
      );
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
    fetchNextThreeDaysForecast();
  }, []);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            onChange={handleCity}
            onKeyDown={handleKeyDown}
            value={text}
          />
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="Search" className="search" />
          </div>
        </div>
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City not found</div>}

        {!loading && !cityNotFound && (
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            lon={lon}
            humidity={humidity}
            wind={wind}
          />
        )}

        <div className="next-three-days-forecast">
          <h2>Next Three Days Forecast</h2>
          {nextThreeDaysForecast.map((forecast, index) => (
            <div key={index} className="forecast-item">
              <div>{new Date(forecast.dt * 1000).toLocaleDateString()}</div>
              <div>Temperature: {forecast.main.temp}°C</div>
              <div>Weather: {forecast.weather[0].description}</div>
            </div>
          ))}
        </div>
        <Link to="/weekly-forecast">
          <button className="read-more-button">Read More</button>
        </Link>
        <p className="copyright">
          Designed by <span>Musharraf</span>
        </p>
      </div>
    </>
  );
}

export default Home;

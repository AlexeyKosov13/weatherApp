import React, { useState } from "react";
import axios from "axios";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import Cloud from "./assets/cloud.png";
import Sunny from "./assets/sunny.png";
import Snow from "./assets/snow.png";
import Rain from "./assets/rain.png";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=cbd884be8dfaeb7549452e820c2f3476&units=metric`;

  const weather = {
    Clear: Sunny,
    Clouds: Cloud,
    Rain: Rain,
    Snow: Snow,
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  const weatherNow = () => {
    for (let wear in weather) {
      if (wear == data.weather[0].main) {
        return (
          <img src={weather[wear]} alt="weather" className="img_weather" />
        );
      }
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.floor(data.main.temp)}°C</h1> : null}
          </div>

          <div className="weather_img">
            {data.weather ? weatherNow() : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className ='map__container'>
          {data.coord?<YMaps>
            <div>
              <Map defaultState={{ center: [data.coord.lat, data.coord.lon], zoom: 9 }} />
            </div>
          </YMaps>:null}
        </div>
        

        {data.name !== undefined && (
          <div className="result">
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity.toFixed()}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()}MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

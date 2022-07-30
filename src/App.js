import React, { useState, useEffect } from "react";
import axios from "axios";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import Clouds from "./assets/cloud.png";
import Sunny from "./assets/sunny.png";
import Snow from "./assets/snow.png";
import Rain from "./assets/rain.png";
import WeatherDay from "./components/WeatherDay/WeatherDay";
import WeatherDays from "./components/WeatherDays/WeatherDays";

function App() {
  const [data, setData] = useState({});
  const [dataDay, setDataDay] = useState({});
  const [dataDays, setDataDays] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=cbd884be8dfaeb7549452e820c2f3476&units=metric`;
  const urlDay = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=cbd884be8dfaeb7549452e820c2f3476&units=metric`;

  const weather = {
    Clear: Sunny,
    Clouds: Clouds,
    Rain: Rain,
    Snow: Snow,
  };

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const response = await axios.get(url);
      const responseDay = await axios.get(urlDay);
      setData(response.data);
      setDataDay(responseDay.data);
      setLocation("");
      console.log(responseDay.data);
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

  const getPointOptions = () => {
    return {
      iconLayout: "default#image",
      iconImageSize: [40, 40],
      iconImageOffset: [-3, -40],
    };
  };

  const changeOnRusWeather = () => {
    const weatherRus = {
      Clear: "Солнечно",
      Clouds: "Облачно",
      Rain: "Дождь",
      Snow: "Снег",
    };
    let res;

    for (let key in weatherRus) {
      if (key == data.weather[0].main) {
        res = weatherRus[key];
        return res;
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
            {data.weather ? <p>{changeOnRusWeather()}</p> : null}
          </div>
        </div>

        <div className="map__container">
          {data.coord ? (
            <YMaps>
              <Map
                state={{ center: [data.coord.lat, data.coord.lon], zoom: 9 }}
                width="300px"
                height="200px"
              >
                <Placemark
                  geometry={[data.coord.lat, data.coord.lon]}
                  options={getPointOptions()}
                />
              </Map>
            </YMaps>
          ) : null}
        </div>

        {data.name !== undefined && (
          <div className="result">
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()} °C</p>
                ) : null}
                <p>Ощущается</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity.toFixed()} %</p>
                ) : null}
                <p>Влажность</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()} м/с</p>
                ) : null}
                <p>Скорость ветра</p>
              </div>
            </div>
          </div>
        )}

        {dataDay.list ? <WeatherDay data={dataDay} /> : null}
        {dataDay.list ? <WeatherDays data={dataDay} /> : null}
      </div>
    </div>
  );
}

export default App;

import React from "react";
import Clouds from "./../../assets/cloud.png";
import Sunny from "./../../assets/sunny.png";
import Snow from "./../../assets/snow.png";
import Rain from "./../../assets/rain.png";
import "./WeatherDays.css";

export default function WeatherDays(data) {
  const weathers = {
    Clear: Sunny,
    Clouds: Clouds,
    Rain: Rain,
    Snow: Snow,
  };

  const weatherImg = (item) => {
    for (let wear in weathers) {
      if (wear == item.weather[0].main) {
        return weathers[wear];
      }
    }
  };
  return (
    <div className="weatherDay">
      <h2>Погода на 5 дней</h2>
      <div className="weatherWrapper">
        {data.data.list.map((item, index) => {
            let date =new Date(item.dt_txt);
          
          if (date.getHours() === 12) {
            return (
              <div className="weather__item" key={index}>
                <img
                  src={weatherImg(item)}
                  alt="weather"
                  className="img_weather"
                />
                <div className="weather__time">
                  {`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
                </div>
                <div className="weather__temp">
                  {Math.round(item.main.temp)} C°
                </div>
                <div className="weather__wind">
                  {Math.round(item.wind.speed)} м/с
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

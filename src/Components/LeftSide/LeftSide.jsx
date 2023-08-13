import React from "react";
import {
  convertTimestamptoWeekday,
  convertKtoC,
  Icons,
} from "../Helper/Helper";

export default function LeftSide({
  forecastData,
  oneCallData,
  searchForecastData,
  getSearchData,
}) {
  const moment = require("moment-timezone");

  return (
    <div className="left-side-container">
      <div className="left-side-container__header">
        <h2>
          {searchForecastData !== undefined
            ? searchForecastData.name
            : forecastData.city.name}
          ,{" "}
          <span>
            {" "}
            {searchForecastData !== undefined
              ? searchForecastData.sys.country
              : forecastData.city.country}
          </span>
        </h2>
      </div>
      {window.matchMedia("(max-width: 1000px)").matches && (
        <div className="row__search-box mobile__search-box">
          <div className="box">
            <span className="icon">
              <i
                onClick={() => {
                  getSearchData(document.querySelector("input").value);
                  document.querySelector("input").value = "";
                }}
                className="fa fa-search"
              ></i>
            </span>
            <input type="text" placeholder="Search city.." />
          </div>
        </div>
      )}
      <div className="left-side-container__icon">
        <img
          src={require(`../../Assets/Images/${Icons(
            oneCallData.current.weather[0].id,
            oneCallData.current.weather[0].icon
          )}.png`)}
          alt=""
        />
      </div>
      <div className="left-side-container__date">
        <h2>
          {convertKtoC(oneCallData.current.temp)} <sup> °C</sup>
        </h2>
        <div className="date-box">
          <h4>
            {convertTimestamptoWeekday(oneCallData.current.dt)},{" "}
            <span>
              {moment
                .unix(oneCallData.current.dt)
                .tz(oneCallData.timezone)
                .format()
                .split("T")[1]
                .split("+")[0]
                .substring(0, 5)}
            </span>
          </h4>
        </div>
      </div>
      <div className="left-side-container__weather-brief">
        <div className="weather-brief__row">
          <p>Clouds - {oneCallData.current.clouds}%</p>
        </div>
        <div className="weather-brief__row">
          <p>
            Dew Point - {convertKtoC(oneCallData.current.dew_point)}
            <sup className="dewpoint-unit"> °C</sup>
          </p>
        </div>
      </div>
      <div className="left-side-container__place">
        <h4>Delhi, NY</h4>
      </div>
    </div>
  );
}

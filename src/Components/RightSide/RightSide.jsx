import React, { useEffect, useRef, useState } from "react";
import {
  Icons,
  convertTimestamptoWeekday,
  convertKtoC,
  convertTimeFormat,
  showUviDescription,
  showVisibilityDescription,
  showHumidityDescription,
  showWindDescription,
  degToCompass,
  showPressureDescription,
} from "../Helper/Helper";

const RightSide = (props) => {
  const carouselRef = useRef();
  const [isMoved, setIsMoved] = useState(false);
  const [switchTab, setSwitchTab] = useState("Week");
  useEffect(() => {
    let difference =
      (document.querySelector(".second-row__carousel-container").children
        .length -
        1) *
        (document.querySelector(".row__box").getBoundingClientRect().width +
          32) +
      document.querySelector(".row__box").getBoundingClientRect().width -
      document
        .querySelector(".second-row__carousel-container")
        .getBoundingClientRect().width;
    if (difference > 0 && difference < 50) {
      document.querySelector(".slider-left").style.visibility = "hidden";
      document.querySelector(".slider-right").style.visibility = "hidden";
    }
  }, []);

  const handleActiveClass = (e) => {
    carouselRef.current.scrollLeft = 0;
    e.target.textContent === "Today"
      ? setSwitchTab("Today")
      : setSwitchTab("Week");
    if (e.target.className !== "active") {
      for (let i = 0; i < 2; i++) {
        if (e.target.parentElement.children[i].className === "active") {
          e.target.parentElement.children[i].classList.remove("active");
        }
      }
      e.target.classList.add("active");
    }
  };
  const handleClick = (direction) => {
    console.log(carouselRef.current.scrollLeft);
    if (direction === "left") {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
    if (direction === "right") {
      setIsMoved(true);
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
  };
  return (
    <div className="right-side-container">
      <div className="right-side-container__first-row">
        <div className="row__switch-tab">
          <h3 onClick={(e) => handleActiveClass(e)}>Today</h3>
          <h3 onClick={(e) => handleActiveClass(e)} className="active">
            Week
          </h3>
        </div>
        <div className="row__search-box">
          <div className="box">
            <span className="icon">
              <i
                onClick={() => {
                  props.getSearchData(document.querySelector("input").value);
                  document.querySelector("input").value = "";
                }}
                className="fa fa-search"
              ></i>
            </span>
            <input type="text" placeholder="Search city.." />
          </div>
        </div>
      </div>
      <div className="right-side-container__second-row">
        <div
          style={{ visibility: !isMoved && "hidden" }}
          className="slider-left"
        >
          <i
            onClick={() => handleClick("left")}
            className="fas fa-chevron-left"
          ></i>
        </div>
        <div ref={carouselRef} className="second-row__carousel-container">
          {switchTab === "Today"
            ? props.oneCallData.hourly
                .filter((data, idx) => idx <= 24)
                .map((day, key) => (
                  <div key={key} className="row__box">
                    <p>
                      {convertTimeFormat(day.dt, props.oneCallData.timezone)}
                    </p>
                    <img
                      src={require(`../../Assets/Images/${Icons(
                        day.weather[0].id,
                        day.weather[0].icon
                      )}.png`)}
                      alt=""
                    />
                    <div className="row__box__min-max">
                      <p>
                        {convertKtoC(day.temp)}{" "}
                        <sup className="max-min">°C</sup>
                      </p>
                    </div>
                  </div>
                ))
            : props.oneCallData.daily
                .filter((data, idx) => idx !== 0)
                .map((day, key) => (
                  <div key={key} className="row__box">
                    <p>{convertTimestamptoWeekday(day.dt)}</p>
                    <img
                      src={require(`../../Assets/Images/${Icons(
                        day.weather[0].id,
                        day.weather[0].icon
                      )}.png`)}
                      alt=""
                    />
                    <div className="row__box__min-max">
                      <p>
                        {convertKtoC(day.temp.max)}{" "}
                        <span>
                          <sup className="max-min">°C</sup> /{" "}
                          {convertKtoC(day.temp.min)}{" "}
                          <sup className="max-min">°C</sup>
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
        </div>
        <div className="slider-right">
          <i
            onClick={() => handleClick("right")}
            className="fas fa-chevron-right"
          ></i>
        </div>
      </div>
      <div className="right-side-container__third-row">
        <h2>Today's Highlights</h2>
      </div>
      <div className="right-side-container__fourth-row">
        <div className="row__container">
          <h4>UV Index</h4>
          <p className="data">{props.oneCallData.current.uvi}</p>
          <div className="description">
            <p className="description__heading">
              {showUviDescription(props.oneCallData.current.uvi)}
            </p>
            <p className="description__body">
              {`${showUviDescription(
                props.oneCallData.current.uvi
              )} risk of harm from UV rays`}
            </p>
          </div>
        </div>
        <div className="row__container">
          <h4>Wind Status</h4>
          <p className="data">
            {props.oneCallData.current.wind_speed}{" "}
            <span className="sub">m/s</span>
          </p>
          <div className="description">
            <p className="description__heading">
              {showWindDescription(props.oneCallData.current.wind_speed * 2.24)}
            </p>
            <p className="description__body">
              {`The wind is flowing in ${degToCompass(
                props.oneCallData.current.wind_deg
              )} direction`}
            </p>
          </div>
        </div>
        <div className="row__container">
          <h4>Sunrise & Sunset</h4>
          <div className="sunrise">
            <img src={require("../../Assets/Images/sunrise.png")} alt="" />
            <p>
              {convertTimeFormat(
                props.oneCallData.current.sunrise,
                props.oneCallData.timezone
              )}
            </p>
          </div>
          <div className="sunset">
            <img src={require("../../Assets/Images/sunset.png")} alt="" />
            <p>
              {convertTimeFormat(
                props.oneCallData.current.sunset,
                props.oneCallData.timezone
              )}
            </p>
          </div>
        </div>
        <div className="row__container">
          <h4>Humidity</h4>
          <p className="data">
            {props.oneCallData.current.humidity}{" "}
            <sup className="data-unit">%</sup>
          </p>
          <p className="description__body">
            {showHumidityDescription(props.oneCallData.current.humidity)}
          </p>
        </div>
        <div className="row__container">
          <h4>Visibility</h4>
          <p className="data">
            {props.oneCallData.current.visibility / 1000}{" "}
            <span className="sub">km</span>
          </p>
          <div className="description">
            <p className="description__heading">
              {showVisibilityDescription(
                props.oneCallData.current.visibility / 1000
              )}
            </p>
            <p className="description__body">
              {`You can have a clear vision upto ${
                props.oneCallData.current.visibility / 1000
              } km`}
            </p>
          </div>
        </div>
        <div className="row__container">
          <h4>Pressure</h4>
          <p className="data">
            {props.oneCallData.current.pressure}{" "}
            <span className="sub">hPa</span>
          </p>
          <div className="description">
            <p className="description__body">
              {showPressureDescription(
                props.oneCallData.current.pressure / 33.86
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightSide;

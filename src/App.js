import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import LeftSide from "./Components/LeftSide/LeftSide";
import RightSide from "./Components/RightSide/RightSide";
import useGeoLocation from "./Components/Hooks/useGeoLocation";

function App() {
  const [oneCallData, setOneCallData] = useState(undefined);
  const [forecastData, setForecastData] = useState(undefined);
  const [searchForecastData, setSearchForecastData] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useGeoLocation();

  const getOneCallData = useCallback(async () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${
        location.loaded ? location.coordinates.lat : 51.5074
      }&lon=${location.loaded ? location.coordinates.lng : 0.1278}&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setOneCallData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    setLoading(true);
  }, [location]);

  const getForecastData = useCallback(async () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${
        location.loaded ? location.coordinates.lat : 51.5074
      }&lon=${location.loaded ? location.coordinates.lng : 0.1278}&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setForecastData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [location]);

  const getData = async (lat, lon) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setOneCallData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    setLoading(true);
  };

  const getSearchData = async (city) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setSearchForecastData(data);
        getData(data.coord.lat, data.coord.lon);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    getOneCallData();
    getForecastData();
  }, [location, getOneCallData, getForecastData]);

  return (
    <div className="App">
      {loading && error === null && (
        <div className="loading-container">
          <svg className="loader" viewBox="0 0 24 24">
            <circle className="loader__value" cx="12" cy="12" r="10" />
            <circle className="loader__value" cx="12" cy="12" r="10" />
            <circle className="loader__value" cx="12" cy="12" r="10" />
            <circle className="loader__value" cx="12" cy="12" r="10" />
            <circle className="loader__value" cx="12" cy="12" r="10" />
            <circle className="loader__value" cx="12" cy="12" r="10" />
          </svg>
        </div>
      )}
      {!loading && error === null && (
        <div className="main-container">
          {((forecastData && oneCallData !== undefined) ||
            searchForecastData !== undefined) && (
            <LeftSide
              forecastData={forecastData}
              searchForecastData={searchForecastData}
              oneCallData={oneCallData}
              getSearchData={getSearchData}
            />
          )}
          {oneCallData !== undefined && (
            <RightSide
              oneCallData={oneCallData}
              getSearchData={getSearchData}
            />
          )}
        </div>
      )}
      {error !== null && (
        <div className="error-container">
          <div className="error-code">
            <h1>{error}</h1>
          </div>
          <h2>Oops! Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>
            Return to homepage
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

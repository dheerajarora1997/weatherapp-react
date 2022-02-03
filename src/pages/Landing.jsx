import React, { useState, useEffect, useRef } from 'react';

import Heading from '../components/Heading';
import TopSearchBar from '../components/TopSearchBar';
import Loader from '../components/Loader'


export default function Landing() {

  const [weatherResponse, setWeatherResponse] = useState({});
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');

  const switchTempUnit = () => {
    if (temperatureUnit === 'celsius') {
      setTemperatureUnit('Fahrenheit')
    }
    else {
      setTemperatureUnit('celsius')
    }
  }

  const [forecast, setForecast] = useState('even');

  const toggleForecast = () => {
    if (forecast === 'even') {
      setForecast('odd');
    }
    else {
      setForecast('even');
    }

  }

  const [location, setLocation] = useState('India');

  const [loading, setLoading] = useState(false)

  const getWeather = async () => {
    setLoading(true);
    const url = `http://api.weatherapi.com/v1/forecast.json?key=ecade1ec1b7047d9994165323223101&q=${location}&days=3&aqi=yes`;

    let data = await fetch(url);
    let parseData = await data.json();
    setWeatherResponse(parseData);

    setLoading(false);
  }

  useEffect(() => {
    getWeather();
  }, [location])

  const searchRef = useRef(null);

  const onSearch = (event) => {
    event.preventDefault();
    let searchValue = searchRef.current.value;
    setLocation(searchValue);
  }

  return (
    <>
      {loading && <div className="loader">
        <Loader></Loader>
      </div>}
      <div className="container pt-2">
        <main className="Shadow-lg bg-light rounded-3 overflow-hidden">
          <div className="row">
            <div className="col-sm-4">
              <div className="bg-white p-3 d-flex flex-column app-left-block">
                <div className="d-flex align-items-center">
                  <TopSearchBar location={location} onSubmit={onSearch} ref={searchRef} />
                </div>
                <img src={weatherResponse?.current?.condition?.icon} alt="logo" className="img-fluid col-4" />
                <Heading level="2" content={`${temperatureUnit === 'celsius' ? weatherResponse?.current?.temp_c : weatherResponse?.current?.temp_f}`} styleClass='display-3 text-center fw-light d-flex align-items-center' subContent={`${temperatureUnit === 'celsius' ? '°C' : '°F'}`} />
                <Heading level="2" content={weatherResponse?.location?.name} styleClass='h4 text-center fw-light d-flex align-items-center'></Heading>
                <p>{weatherResponse?.location?.country}</p>
                <p className="">{weatherResponse?.location?.localtime}</p>
                <p className="mb-0"><span className="text-muted">Time Zone</span> - {weatherResponse?.location?.tz_id}</p>
                <hr />
                <p>{weatherResponse?.current?.condition?.text}</p>
                <p className={`${temperatureUnit === 'celsius' ? '' : 'd-none'}`}>{weatherResponse?.forecast?.forecastday?.[0]?.day?.maxtemp_c} / {weatherResponse?.forecast?.forecastday?.[0]?.day?.mintemp_c} °C</p>
                <p className={`${temperatureUnit === 'celsius' ? 'd-none' : ''}`}>{weatherResponse?.forecast?.forecastday?.[0]?.day?.maxtemp_f} / {weatherResponse?.forecast?.forecastday?.[0]?.day?.mintemp_f} °F</p>
                <p>Humidity - {weatherResponse?.current?.humidity}%</p>
                <div className="progress" style={{ height: "4px" }}>
                  <div className={`progress-bar bg-${weatherResponse?.current?.humidity > 60 ? 'danger' : 'warning'}`} role="progressbar" style={{ width: `${weatherResponse?.current?.humidity}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="text-muted mt-2 mb-0">Developer : <a href="https://www.linkedin.com/in/dheerajarora1997/" rel="noreferrer" target='_blank' className="text-warning">Dheeraj Arora <span className="material-icons-outlined" style={{ fontSize: '15px' }}> launch </span></a></p>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="today-tab" data-bs-toggle="tab" data-bs-target="#today" type="button" role="tab" aria-controls="today" aria-selected="true">Today</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="forecast-tab" data-bs-toggle="tab" data-bs-target="#forecast" type="button" role="tab" aria-controls="forecast" aria-selected="false">Forecast</button>
                    </li>
                  </ul>
                  <div className="d-flex">
                    <button className="btn btn-sm btn-warning text-light" onClick={switchTempUnit} >Switch to {temperatureUnit === 'celsius' ? 'Fahrenheit' : 'Celsius'}</button>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="row">
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="today" role="tabpanel" aria-labelledby="today-tab">
                        <div className="row mt-2">
                          <div className="col-3">
                            <div className="bg-white p-4 shadow rounded-3 mb-3 text-center">
                              <span className="text-muted">{weatherResponse?.forecast?.forecastday?.[0].astro.sunrise}</span>
                              <h3 className="fw-light h6 mb-0 mt-1">Sun Rise</h3>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="bg-white p-4 shadow rounded-3 mb-3 text-center">
                              <span className="text-muted">{weatherResponse?.forecast?.forecastday?.[0].astro.sunset}</span>
                              <h3 className="fw-light h6 mb-0 mt-1">Sun Set</h3>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="bg-white p-4 shadow rounded-3 mb-3 text-center">
                              <span className="text-muted">{weatherResponse?.current?.wind_kph} k/h</span>
                              <h3 className="fw-light h6 mb-0 mt-1">Wind Speed</h3>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="bg-white p-4 shadow rounded-3 mb-3 text-center">
                              <span className="text-muted">{weatherResponse?.current?.wind_degree}°</span>
                              <h3 className="fw-light h6 mb-0 mt-1">Wind Degree</h3>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-flex align-items-center">
                              <span className="text-muted">Today Forecast</span>
                              <button className="btn btn-sm btn-warning text-light ms-auto rounded-pill" onClick={toggleForecast}>Switch Time</button>
                            </div>
                            <hr />
                          </div>
                          {weatherResponse?.forecast?.forecastday?.[0].hour.map((element, index) => {
                            return (
                              <div className={`col-4 ${index % 2 ? forecast === 'even' ? 'd-none' : '' : forecast === 'odd' ? 'd-none' : ''}`} key={index}>
                                <div className="bg-white p-2 shadow rounded-3 mb-3 text-center">
                                  <div className="row align-items-center">
                                    <div className="col-sm-4">
                                      <div className="bg-light rounded">
                                        <img src={element.condition?.icon} alt="logo" className="img-fluid" />
                                      </div>
                                    </div>
                                    <div className="col-sm-8">
                                      <p className="mb-0 d-flex justify-content-between align-items-center">
                                        <span>{temperatureUnit === 'celsius' ? element.temp_c : element.temp_f} {temperatureUnit === 'celsius' ? '°C' : '°F'}</span>
                                        -
                                        <span className="h6 mb-0 fw-light text-muted">{element.time.slice(10, 16)}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="tab-pane fade" id="forecast" role="tabpanel" aria-labelledby="forecast-tab">
                        <div className="row mt-3">
                          <div className="col-12">
                            <span className="text-muted">Weekly Forecast</span>
                            <hr />
                          </div>
                          <div className="row">
                            {weatherResponse?.forecast?.forecastday?.map((element, index) => {
                              return (
                                <div className="col-12" key={index}>
                                  <div className="bg-white shadow rounded-3 mb-3">
                                    <div className="row align-items-center">
                                      <div className="col-sm-3">
                                        <div className="bg-light d-block rounded p-4 text-center">
                                          <img src={element?.day?.condition?.icon} alt={element?.day?.condition?.text} />
                                        </div>
                                      </div>
                                      <div className="col-sm-9">
                                        <div className="row mb-3">
                                          <div className="col-sm-3">
                                            <span className="text-muted">Date</span>
                                          </div>
                                          <div className="col-sm-3">
                                            <p className="mb-0">{element.date}</p>
                                          </div>
                                          <div className="col-sm-6">
                                            <p className="mb-0">{element?.day?.condition?.text}</p>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-sm-3">
                                            <span className="text-muted">Max Temp.</span>
                                          </div>
                                          <div className="col-sm-3">
                                            <p className="mb-0">{temperatureUnit === 'celsius' ? element?.day?.maxtemp_c : element?.day?.maxtemp_f} {temperatureUnit === 'celsius' ? '°C' : '°F'}</p>
                                          </div>
                                          <div className="col-sm-3">
                                            <span className="text-muted">Min Temp.</span>
                                          </div>
                                          <div className="col-sm-3">
                                            <p className="mb-0">{temperatureUnit === 'celsius' ? element?.day?.mintemp_c : element?.day?.mintemp_f} {temperatureUnit === 'celsius' ? '°C' : '°F'}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

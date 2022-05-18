import React, { useState, useEffect, useRef } from 'react';

import Heading from '../components/Heading';
import TopSearchBar from '../components/TopSearchBar';
import Loader from '../components/Loader';

import NoData from '../NoData.png';

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

  const [location, setLocation] = useState('New Delhi');
  const [loading, setLoading] = useState(false);
  const [currentTemp, setCurrentTemp] = useState();
  const [dataAvailable, setDataAvailable] = useState(false);


  const getWeather = async () => {
    setLoading(true);
    // New url for update response
    const newUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=269ae75ef90dca5bd7e65107db737320`;
    let newData = await fetch(newUrl);
    let parseNewData = await newData.json();
    if (parseNewData.cod == 404) {
      setDataAvailable(false);
    }
    else {
      setWeatherResponse(parseNewData);
      setDataAvailable(true);
    }
    setLoading(false);
  }


  useEffect(() => {
    getWeather();
  }, [location])

  useEffect(() => {
    setCurrentTemp(weatherResponse?.list?.[0]?.main?.temp);
  }, [weatherResponse])

  const searchRef = useRef(null);

  const onSearch = (event) => {
    event.preventDefault();
    let searchValue = searchRef.current.value;
    setLocation(searchValue);
  }

  let riseTime, riseHours, riseMinutes, sunSetTime, sunSetHours, sunSetMinutes;

  riseTime = new Date((weatherResponse?.city?.sunrise * 1000));
  riseHours = riseTime.getHours();
  riseMinutes = riseTime.getMinutes();

  sunSetTime = new Date((weatherResponse?.city?.sunset * 1000));
  sunSetHours = sunSetTime.getHours();
  sunSetMinutes = sunSetTime.getMinutes();

  const reload = () => {
    setLocation('Delhi');
  }

  return (
    <>
      {loading && <div className="loader">
        <Loader></Loader>
      </div>}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container pt-2">
          <main className="Shadow-lg bg-light rounded-3 overflow-hidden">
            <div className="row">
              {weatherResponse.cod && dataAvailable ? (<>
                <div className="col-sm-4">
                  <div className="bg-white p-3 d-flex flex-column app-left-block">
                    <div className="d-flex align-items-center">
                      <TopSearchBar location={location} onSubmit={onSearch} ref={searchRef} />
                    </div>
                    <Heading level="2" content={`${temperatureUnit === 'celsius' ? currentTemp : Math.ceil(currentTemp * 1.8)}`} styleClass='display-3 text-center fw-light d-flex align-items-center' subContent={`${temperatureUnit === 'celsius' ? '°C' : '°F'}`} />
                    <h2>{weatherResponse.city.name}</h2>
                    <p>{weatherResponse.city.country}</p>
                    <p className="d-flex justify-content-between">
                      <small className="text-muted">Time Zone</small>
                      <span>{weatherResponse.city.timezone}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                      <small className="text-muted">Weather Condition</small>
                      <span>{weatherResponse.list[0].weather[0].main}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                      <small className="text-muted">Population</small>
                      <span>{weatherResponse.city.population}</span>
                    </p>
                    {/* <p className="mb-0"><span className="text-muted">Time Zone</span> - {weatherResponse.location.tz_id}</p> */}
                    <hr className="my-2" />
                    <p className="d-flex justify-content-between">
                      <small className="text-muted">Max / Min</small>
                      {`${temperatureUnit === 'celsius' ? Math.ceil(weatherResponse.list[0].main.temp_max) + '° / ' + Math.floor(weatherResponse.list[0].main.temp_min) + '° ' : (Math.ceil(weatherResponse.list[0].main.temp_max * 1.8)) + ' / ' + (Math.floor(weatherResponse.list[0].main.temp_min * 1.8)) + '° '}`}
                    </p>
                    <p className="d-flex justify-content-between">
                      <small className="text-muted">visibility</small>
                      {(weatherResponse.list[0].visibility * 100 / 10000) + '%'}
                    </p>
                    <p className="d-flex justify-content-between">
                      <small className="text-muted">Humidity</small>
                      {weatherResponse.list[0].main.humidity}%
                    </p>
                    <div className="progress mb-3" style={{ height: "4px" }}>
                      <div className={`progress-bar bg-warning`} role="progressbar" style={{ width: `${weatherResponse.list[0].main.humidity}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="py-1 bg-warning bg-opacity-10 text-warning mt-4 mb-0 text-center"><small className="text-muted">Developer : </small><a href="https://www.linkedin.com/in/dheerajarora1997/" rel="noreferrer" target='_blank' className="text-warning">Dheeraj Arora <span className="material-icons-outlined" style={{ fontSize: '15px' }}> launch </span></a></p>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="today-tab" data-bs-toggle="tab" data-bs-target="#today" type="button" role="tab" aria-controls="today" aria-selected="true">Recent</button>
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
                              <div className="col-12 col-sm-6 col-md-3">
                                <div className="bg-white p-4 shadow rounded-3 mb-3 text-center">
                                  <span className="text-muted">{riseHours < 10 ? `0${riseHours}` : riseHours}:{riseMinutes < 10 ? `0${riseMinutes}` : riseMinutes}</span>
                                  <h3 className="fw-light h6 mb-0 mt-1">Sun Rise</h3>
                                </div>
                              </div>
                              <div className="col-12 col-sm-6 col-md-3">
                                <div className="bg-white p-4 shadow rounded-3 mb-3 text-center">
                                  <span className="text-muted">{sunSetHours < 10 ? `0${sunSetHours}` : sunSetHours}:{sunSetMinutes < 10 ? `0${sunSetMinutes}` : sunSetMinutes}</span>
                                  <h3 className="fw-light h6 mb-0 mt-1">Sun Set</h3>
                                </div>
                              </div>
                              <div className="col-12 col-sm-6 col-md-3">
                                <div className="bg-white p-4 shadow rounded-3 mb-3 text-center">
                                  <span className="text-muted">{weatherResponse.list[0].wind.speed} k/h</span>
                                  <h3 className="fw-light h6 mb-0 mt-1">Wind Speed</h3>
                                </div>
                              </div>
                              <div className="col-12 col-sm-6 col-md-3">
                                <div className="bg-white p-4 shadow rounded-3 mb-3 text-center">
                                  <span className="text-muted">{weatherResponse.list[0].wind.deg}°</span>
                                  <h3 className="fw-light h6 mb-0 mt-1">Wind Degree</h3>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="d-flex align-items-center">
                                  <span className="text-muted">Forecast</span>
                                </div>
                              </div>
                              {weatherResponse.list.slice(0, 9).map((element, index) => {
                                return (
                                  <div className="col-12 col-sm-6 col-md-4 pt-3" key={index}>
                                    <div className="bg-white p-2 shadow rounded-3 mb-3">
                                      <div className="d-flex justify-content-between">
                                        <small className="text-muted">Temp.</small>
                                        {`${temperatureUnit === 'celsius' ? Math.ceil(element.main.temp_max) + '° / ' + Math.floor(element.main.temp_min) + '° ' : (Math.ceil(element.main.temp_max * 1.8)) + ' / ' + (Math.floor(element.main.temp_min * 1.8)) + '° '}`}
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <small className="text-muted">Wind Speed</small>
                                        <span>
                                          {element.wind.speed} km/h
                                        </span>
                                      </div>
                                      <small className="d-block badge bg-warning text-warning bg-opacity-25 mt-2">
                                        {element.dt_txt.slice(0, 16)}
                                      </small>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                          <div className="tab-pane fade" id="forecast" role="tabpanel" aria-labelledby="forecast-tab">
                            <div className="row">
                              {weatherResponse.list.slice(9, 21).map((element, index) => {
                                return (
                                  <div className="col-12 col-sm-6 col-md-4 pt-3" key={index}>
                                    <div className="bg-white p-2 shadow rounded-3 mb-3">
                                      <div className="d-flex justify-content-between">
                                        <small className="text-muted">Temp.</small>
                                        {`${temperatureUnit === 'celsius' ? Math.ceil(element.main.temp_max) + '° / ' + Math.floor(element.main.temp_min) + '° ' : (Math.ceil(element.main.temp_max)) * 1.8 + ' / ' + (Math.floor(element.main.temp_min)) * 1.8 + '° '}`}
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <small className="text-muted">Wind Speed</small>
                                        <span>
                                          {element.wind.speed} km/h
                                        </span>
                                      </div>
                                      <small className="d-block badge bg-warning text-warning bg-opacity-25 mt-2">
                                        {element.dt_txt.slice(0, 16)}
                                      </small>
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
              </>) : null}
              {
                !dataAvailable ?
                  <>
                    <div className="col-4 text-center mx-auto p-5">
                      <img src={NoData} alt="NO data" className="img-fluid mb-2" />
                    </div>
                    <div className="col-10 text-center mb-5 mx-auto">
                      <p className="text-muted">Searched <strong className="badge bg-white text-warning"> {location} </strong> city not available. click the below button to make it Delhi</p>
                      <button className="btn btn-outline-warning bg-white d-inline-block" onClick={reload}>Reset to Delhi</button>
                    </div>
                  </> : null
              }
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

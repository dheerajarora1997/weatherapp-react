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
  const [forecastValue, setForecastValue] = useState(9);

  const addForecastValue = () => {
    setForecastValue(forecastValue + 7);
  }

  const lessForecastValue = () => {
    setForecastValue(forecastValue - 7);
  }



  const getWeather = async () => {
    setLoading(true);
    // New url for update response
    const newUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=269ae75ef90dca5bd7e65107db737320`;
    let newData = await fetch(newUrl);
    let parseNewData = await newData.json();
    if (parseNewData.cod == 200) {
      setWeatherResponse(parseNewData);
      setDataAvailable(true);
    }
    else {
      setDataAvailable(false);
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

  // result = myArr.filter(compareToday => compareToday == myArr[0])

  return (
    <>
      {

      }
      {loading && <div className="loader">
        <Loader></Loader>
      </div>}
      <div className={`d-flex justify-content-center align-items-center ${!dataAvailable ? '' : ''}`}>
        <div className={`container px-md-auto ${!dataAvailable ? 'p-0' : 'px-4 py-2'}`}>
          <main className={`Shadow-lg rounded-3 overflow-hidden bg-white ${!dataAvailable ? 'pt-5 col-10 mx-auto' : ''}`}>
            <div className="row">
              {weatherResponse.cod && dataAvailable ? (<>
                <div className="col-sm-4">
                  <div className="bg-white p-3 d-flex flex-column app-left-block">
                    <div className="d-flex align-items-center">
                      <TopSearchBar location={location} onSubmit={onSearch} ref={searchRef} />
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <Heading level="2" content={`${temperatureUnit === 'celsius' ? currentTemp : Math.ceil(currentTemp * 1.8)}`} styleClass='display-6 text-center fw-light d-flex align-items-center' subContent={`${temperatureUnit === 'celsius' ? '°C' : '°F'}`} />
                        <h5>{weatherResponse.city.name}</h5>
                        <p className="mb-1">{weatherResponse.city.country}</p>
                      </div>
                      <div className="col-4">
                        <img src={`http://openweathermap.org/img/wn/${weatherResponse.list[0].weather[0].icon}@2x.png`} alt="" />
                      </div>

                    </div>

                    <hr className="my-2" />
                    <p className="d-flex justify-content-between mb-1 mb-md-2">
                      <small className="text-muted">Max / Min</small>
                      {`${temperatureUnit === 'celsius' ? Math.ceil(weatherResponse.list[0].main.temp_max) + '° / ' + Math.floor(weatherResponse.list[0].main.temp_min) + '° ' : (Math.ceil(weatherResponse.list[0].main.temp_max * 1.8)) + ' / ' + (Math.floor(weatherResponse.list[0].main.temp_min * 1.8)) + '° '}`}
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-2">
                      <small className="text-muted">Weather Condition</small>
                      <span>{weatherResponse.list[0].weather[0].main}</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-2">
                      <small className="text-muted">visibility</small>
                      {(weatherResponse.list[0].visibility * 100 / 10000) + '%'}
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-2">
                      <small className="text-muted">Humidity</small>
                      {weatherResponse.list[0].main.humidity}%
                    </p>
                    <hr className="my-2" />
                    <p className="d-flex justify-content-between mb-1 mb-md-2">
                      <small className="text-muted">Sun Rise</small>
                      <span>{riseHours < 10 ? `0${riseHours}` : riseHours}:{riseMinutes < 10 ? `0${riseMinutes}` : riseMinutes}</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-2">
                      <small className="text-muted">Sun Set</small>
                      <span>{sunSetHours < 10 ? `0${sunSetHours}` : sunSetHours}:{sunSetMinutes < 10 ? `0${sunSetMinutes}` : sunSetMinutes}</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-2">
                      <small className="text-muted">Wind Speed</small>
                      <span>{weatherResponse.list[0].wind.speed} k/h</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-2">
                      <small className="text-muted">Wind Degree</small>
                      <span>{weatherResponse.list[0].wind.deg}°</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-2">
                      <small className="text-muted">Population</small>
                      <span>{weatherResponse.city.population}</span>
                    </p>
                    <div className="progress mb-3" style={{ height: "4px" }}>
                      <div className={`progress-bar bg-warning`} role="progressbar" style={{ width: `${weatherResponse.list[0].main.humidity}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="d-none d-sm-block py-2 bg-warning bg-opacity-10 text-warning mt-2 mb-0 text-center"><small className="text-muted">Developer : </small><a href="https://www.linkedin.com/in/dheerajarora1997/" rel="noreferrer" target='_blank' className="text-warning">Dheeraj Arora <span className="material-icons-outlined" style={{ fontSize: '15px' }}> launch </span></a></p>
                  </div>
                </div>
                <div className="col-sm-8 bg-light">
                  <div className="px-4 py-3">
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
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex align-items-center">
                                  <span className="text-muted">Today</span>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="row">
                                  {weatherResponse.list.filter(function (el) { return (el.dt_txt).slice(0, 10) == (weatherResponse.list[0].dt_txt).slice(0, 10) }).map((element, index) => {
                                    return (
                                      <div className="col-12 col-sm-6 col-md-4 pt-3 mb-3" key={index}>
                                        <div className="bg-white p-2 shadow rounded-3">
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
                                            {element.dt_txt.slice(11, 16)}
                                          </small>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="d-flex align-items-center">
                                  <span className="text-muted">Tomorrow</span>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="row">
                                  {weatherResponse.list.filter(function (el) { return (el.dt_txt).slice(0, 10) == (weatherResponse.list[9].dt_txt).slice(0, 10) }).map((element, index) => {
                                    return (
                                      <div className="col-12 col-sm-6 col-md-4 pt-3 mb-3" key={index}>
                                        <div className="bg-white p-2 shadow rounded-3">
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
                                            {element.dt_txt.slice(11, 16)}
                                          </small>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="forecast" role="tabpanel" aria-labelledby="forecast-tab">
                            <div className="row">
                              <div className="col-8">
                                <span className="text-muted">
                                  {weatherResponse.list[forecastValue].dt_txt.slice(0, 10)}
                                </span>
                              </div>
                              <div className="col-4 text-end">
                                {/* Next Button */}
                                <div className="btn-group btn-group-sm ">
                                  <button className="btn btn-warning bg-opacity-50" type="button" onClick={lessForecastValue} disabled={forecastValue < 10 ? 'disabled' : ''}>
                                    Prev
                                  </button>
                                  <button className="btn btn-warning bg-opacity-50" type="button" onClick={addForecastValue} disabled={forecastValue > 36 ? 'disabled' : ''}>
                                    Next
                                  </button>
                                </div>
                              </div>
                              {weatherResponse.list.filter(function (el) { return (el.dt_txt).slice(0, 10) == (weatherResponse.list[forecastValue].dt_txt).slice(0, 10) }).map((element, index) => {
                                return (
                                  <div className="col-12 col-sm-6 col-md-6 pt-3 mb-3" key={index}>
                                    <div className="bg-white p-2 shadow rounded-3">
                                      <div className="row">
                                        <div className="col-3 pr-0 text-center">
                                          <div className="bg-light d-flex align-items-center flex-column">
                                            <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="" className="img-fluid" />
                                            <small className="text-muted mb-1 mx-auto" style={{lineHeight : '1'}}>{element.weather[0].main}</small>
                                          </div>
                                        </div>
                                        <div className="col-9">
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
                                            {element.dt_txt.slice(11, 16)}
                                          </small>
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
                  <p className="d-sm-none d-block py-2 bg-warning bg-opacity-10 text-warning mb-0 text-center"><small className="text-muted">Developer : </small><a href="https://www.linkedin.com/in/dheerajarora1997/" rel="noreferrer" target='_blank' className="text-warning">Dheeraj Arora <span className="material-icons-outlined" style={{ fontSize: '15px' }}> launch </span></a></p>
                </div>
              </>) : <>
                <div className="col-12 col-sm-4 text-center mx-auto">
                  <img src={NoData} alt="NO data" className="img-fluid mb-2 mt-5 px-5" />
                </div>
                <div className="col-11 mx-auto">
                  <h4 className="text-muted text-center my-2">Kindly search a Valid city.</h4>
                </div>
                <div className="col-10 col-sm-4 mx-auto">
                  <TopSearchBar location={location} onSubmit={onSearch} ref={searchRef} />
                </div>
                <p className="py-2 bg-warning bg-opacity-10 text-warning mt-4 mb-0 text-center"><small className="text-muted">Developer : </small><a href="https://www.linkedin.com/in/dheerajarora1997/" rel="noreferrer" target='_blank' className="text-warning">Dheeraj Arora <span className="material-icons-outlined" style={{ fontSize: '15px' }}> launch </span></a></p>
              </>}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

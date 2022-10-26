import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

import TopSearchBar from '../components/TopSearchBar';
import Loader from '../components/Loader';

import NoData from '../NoData4.png';
import Map from '../components/Map';

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

  const [lng, setLng] = useState('77.2311')
  const [lat, setLat] = useState('28.6128')

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
    setLng(weatherResponse?.city?.coord?.lon);
    setLat(weatherResponse?.city?.coord?.lat);
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

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "#323232" }}
        onClick={onClick}
      >chevron_right</div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={` material-icons-outlined ${className}`} style={{ ...style, display: "block", color: "#323232" }} onClick={onClick}> chevron_left </div>
    );
  }
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '50px',
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  }

  return (
    <>
      {loading && <div className="loader">
        <Loader></Loader>
      </div>}
      <div className={`d-flex justify-content-center align-items-center text-white`} style={{ minHeight: '100vh', }}>
        <div className="container py-2">
          <main className={`Shadow-lg rounded-3 overflow-hidden bg-light bg-opacity-10 shadow ${!dataAvailable ? 'pt-4 col-10 mx-auto mt-4' : ''}`}>
            <div className="row">
              {weatherResponse.cod && dataAvailable ? (<>
                <div className="col-sm-4 border-end">
                  <div className=" p-3 d-flex flex-column app-left-block">
                    <div className="d-flex align-items-center">
                      <TopSearchBar location={location} onSubmit={onSearch} ref={searchRef} />
                    </div>
                    <div className="row justify-content-center position-relative rounded overflow-hidden g-0">
                      <div className="col-11 d-flex align-items-center justify-content-between position-absolute bg-dark bg-opacity-75 rounded mt-2 px-2" style={{ 'z-index': '9999' }}>
                        <span className="m-0 p-1">{weatherResponse.city.country}</span>
                        <h4 className="m-0 p-1 text-center fw-light d-flex align-items-center text-white">
                          {temperatureUnit === 'celsius' ? currentTemp : Math.ceil(currentTemp * 1.8)}
                          <span className="h5 fw-light text-white text-opacity-50">{temperatureUnit === 'celsius' ? '°C' : '°F'}</span>
                        </h4>
                        {/* <h5>{weatherResponse.city.name}</h5> */}
                      </div>
                      <div className="col-12 position-relative" style={{ 'minHeight': '200px' }}>
                        {/* <img src={`http://openweathermap.org/img/wn/${weatherResponse.list[0].weather[0].icon}@2x.png`} className="bg-light bg-opacity-50 img-fluid rounded-circle" alt="" /> */}
                        <Map location={location} lng={lng} lat={lat} />
                      </div>

                    </div>

                    <hr className="my-2" />
                    <p className="d-flex justify-content-between mb-1 mb-md-1">
                      <small className="text-white text-opacity-75">Max / Min</small>
                      {`${temperatureUnit === 'celsius' ? Math.ceil(weatherResponse.list[0].main.temp_max) + '° / ' + Math.floor(weatherResponse.list[0].main.temp_min) + '° ' : (Math.ceil(weatherResponse.list[0].main.temp_max * 1.8)) + ' / ' + (Math.floor(weatherResponse.list[0].main.temp_min * 1.8)) + '° '}`}
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-1">
                      <small className="text-white text-opacity-75">Weather Condition</small>
                      <span>{weatherResponse.list[0].weather[0].main}</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-1">
                      <small className="text-white text-opacity-75">visibility</small>
                      {(weatherResponse.list[0].visibility * 100 / 10000) + '%'}
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-1">
                      <small className="text-white text-opacity-75">Humidity</small>
                      {weatherResponse.list[0].main.humidity}%
                    </p>
                    <hr className="my-2" />
                    <p className="d-flex justify-content-between mb-1 mb-md-1">
                      <small className="text-white text-opacity-75">Sun Rise</small>
                      <span>{riseHours < 10 ? `0${riseHours}` : riseHours}:{riseMinutes < 10 ? `0${riseMinutes}` : riseMinutes}</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-1">
                      <small className="text-white text-opacity-75">Sun Set</small>
                      <span>{sunSetHours < 10 ? `0${sunSetHours}` : sunSetHours}:{sunSetMinutes < 10 ? `0${sunSetMinutes}` : sunSetMinutes}</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-1">
                      <small className="text-white text-opacity-75">Wind Speed</small>
                      <span>{weatherResponse.list[0].wind.speed} k/h</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1 mb-md-1">
                      <small className="text-white text-opacity-75">Wind Degree</small>
                      <span>{weatherResponse.list[0].wind.deg}°</span>
                    </p>
                    {/* <p className="d-flex justify-content-between mb-1 mb-md-1">
                      <small className="text-white text-opacity-75">Population</small>
                      <span>{weatherResponse.city.population}</span>
                    </p> */}
                    <div className="progress mb-3" style={{ height: "4px" }}>
                      <div className={`progress-bar bg-primary`} role="progressbar" style={{ width: `${weatherResponse.list[0].main.humidity}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="d-none d-sm-flex py-2 bg-dark text-primary mt-1 mb-0 text-center mx-auto w-100 justify-content-center align-items-center"><small className="text-white text-opacity-75">Developer : &nbsp;</small><a href="https://www.linkedin.com/in/dheerajarora1997/" rel="noreferrer" target='_blank' className="text-primary">Dheeraj Arora <sup className="material-icons-outlined" style={{ fontSize: '12px' }}> launch </sup></a></p>
                  </div>
                </div>
                <div className="col-sm-8 bg-dark">
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
                        {/* <button className="btn btn-sm btn-primary text-light" onClick={switchTempUnit} >Switch to {temperatureUnit === 'celsius' ? 'Fahrenheit' : 'Celsius'}</button> */}
                      </div>
                    </div>
                    <div className="d-block">
                      <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="today" role="tabpanel" aria-labelledby="today-tab">
                          <div className="d-flex align-items-center">
                            <span className="text-white text-opacity-75 mb-1">Today</span>
                          </div>
                          <Slider {...sliderSettings}>
                            {weatherResponse.list.filter(function (el) { return (el.dt_txt).slice(0, 10) == (weatherResponse.list[0].dt_txt).slice(0, 10) }).map((element, index) => {
                              return (
                                <div className="pe-2" key={index} index={index}>
                                  <div className="bg-light bg-opacity-10 p-2 shadow-sm border-dark rounded-3 my-1">
                                    <div className="bg-light bg-opacity-50 d-flex align-items-center flex-column mb-2 rounded">
                                      <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="" className="img-fluid filter-img" />
                                      <small className="text-white text-opacity-75 mb-2 mx-auto" style={{ lineHeight: '1' }}>{element.weather[0].main}</small>
                                    </div>
                                    <div className="d-flex justify-content-center mt-1">
                                      {`${temperatureUnit === 'celsius' ? Math.ceil(element.main.temp_max) + '° / ' + Math.floor(element.main.temp_min) + '° ' : (Math.ceil(element.main.temp_max * 1.8)) + ' / ' + (Math.floor(element.main.temp_min * 1.8)) + '° '}`}
                                    </div>
                                    <div className="d-flex justify-content-center">
                                      <span>
                                        {element.wind.speed} km/h
                                      </span>
                                    </div>
                                    <small className="d-flex badge bg-primary text-white bg-opacity-75 mt-2 align-items-center justify-content-center">
                                      <span className="material-icons-outlined me-1"> query_builder </span>
                                      <span>
                                        {element.dt_txt.slice(11, 16)}
                                      </span>
                                    </small>
                                  </div>
                                </div>
                              )
                            })}
                          </Slider>
                          <div className="d-flex align-items-center">
                            <span className="text-white text-opacity-75 mt-2 mb-0">Tomorrow</span>
                          </div>
                          <Slider {...sliderSettings}>
                            {weatherResponse.list.filter(function (el) { return (el.dt_txt).slice(0, 10) == (weatherResponse.list[9].dt_txt).slice(0, 10) }).map((element, index) => {
                              return (
                                <div className="pe-2" key={index} index={index}>
                                  <div className="bg-light bg-opacity-10 p-2 shadow-sm border-dark rounded-3 my-1">
                                    <div className="bg-light bg-opacity-50 d-flex align-items-center flex-column mb-2 rounded">
                                      <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="" className="img-fluid filter-img" />
                                      <small className="text-white text-opacity-75 mb-2 mx-auto" style={{ lineHeight: '1' }}>{element.weather[0].main}</small>
                                    </div>
                                    <div className="d-flex justify-content-center mt-1">
                                      {`${temperatureUnit === 'celsius' ? Math.ceil(element.main.temp_max) + '° / ' + Math.floor(element.main.temp_min) + '° ' : (Math.ceil(element.main.temp_max * 1.8)) + ' / ' + (Math.floor(element.main.temp_min * 1.8)) + '° '}`}
                                    </div>
                                    <div className="d-flex justify-content-center">
                                      <span>
                                        {element.wind.speed} km/h
                                      </span>
                                    </div>
                                    <small className="d-flex badge bg-primary text-white bg-opacity-75 mt-2 align-items-center justify-content-center">
                                      <span className="material-icons-outlined me-1"> query_builder </span>
                                      <span>
                                        {element.dt_txt.slice(11, 16)}
                                      </span>
                                    </small>
                                  </div>
                                </div>
                              )
                            })}
                          </Slider>
                        </div>
                        <div className="tab-pane fade" id="forecast" role="tabpanel" aria-labelledby="forecast-tab">
                          <div className="row align-items-center">
                            <div className="col-6">
                              <span className="text-white text-opacity-75">
                                {weatherResponse.list[forecastValue].dt_txt.slice(0, 10)}
                              </span>
                            </div>
                            <div className="col-6 text-end">
                              {/* Next Button */}
                              <div className="btn-group btn-group-sm pb-1">
                                <button className="btn btn-primary text-white my-1" type="button" onClick={lessForecastValue} disabled={forecastValue < 10 ? 'disabled' : ''}>
                                  Prev
                                </button>
                                <button className="btn btn-primary text-white my-1" type="button" onClick={addForecastValue} disabled={forecastValue > 36 ? 'disabled' : ''}>
                                  Next
                                </button>
                              </div>
                            </div>
                            {weatherResponse.list.filter(function (el) { return (el.dt_txt).slice(0, 10) == (weatherResponse.list[forecastValue].dt_txt).slice(0, 10) }).map((element, index) => {
                              return (
                                <div className="col-6 col-sm-6 col-md-3 pt-3 mb-2 ps-0" key={index}>
                                  <div className="bg-light bg-opacity-10 p-2 shadow-sm border-dark rounded-3">
                                    <div className="bg-light bg-opacity-50 d-flex align-items-center flex-column mb-2">
                                      <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="" className="img-fluid filter-img" />
                                      <small className="text-white text-opacity-75 mb-2 mx-auto" style={{ lineHeight: '1' }}>{element.weather[0].main}</small>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                      {`${temperatureUnit === 'celsius' ? Math.ceil(element.main.temp_max) + '° / ' + Math.floor(element.main.temp_min) + '° ' : (Math.ceil(element.main.temp_max * 1.8)) + ' / ' + (Math.floor(element.main.temp_min * 1.8)) + '° '}`}
                                    </div>
                                    <div className="d-flex justify-content-center">
                                      <span>
                                        {element.wind.speed} km/h
                                      </span>
                                    </div>
                                    <small className="d-flex badge bg-primary text-white bg-opacity-75 mt-2 align-items-center justify-content-center">
                                      <span className="material-icons-outlined me-1"> query_builder </span>
                                      <span>
                                        {element.dt_txt.slice(11, 16)}
                                      </span>
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
                  <p className="d-sm-none d-block py-2 bg-dark text-primary mb-0 text-center"><small className="text-white text-opacity-75">Developer : &nbsp;</small><a href="https://www.linkedin.com/in/dheerajarora1997/" rel="noreferrer" target='_blank' className="text-primary">Dheeraj Arora <sup className="material-icons-outlined" style={{ fontSize: '12px' }}> launch </sup></a></p>
                </div>
              </>) : <>
                <div className="col-12 col-sm-3 pt-3 text-center mx-auto">
                  <img src={NoData} alt="NO data" className="img-fluid mt-4 mb-4 px-5 col-9 col-sm-12" />
                </div>
                <div className="col-11 mx-auto">
                  <h5 className="text-white text-opacity-75 text-center my-2">Kindly search a Valid city.</h5>
                </div>
                <div className={`col-10 col-sm-4 mx-auto ${!dataAvailable ? 'mb-4' : ''}`}>
                  <TopSearchBar dataAvailable={dataAvailable} location={location} onSubmit={onSearch} ref={searchRef} />
                </div>
                <p className="py-2 bg-dark text-primary mt-4 mb-0 text-center"><small className="text-white text-opacity-75">Developer : &nbsp;</small><a href="https://www.linkedin.com/in/dheerajarora1997/" rel="noreferrer" target='_blank' className="text-primary">Dheeraj Arora <sup className="material-icons-outlined" style={{ fontSize: '12px' }}> launch </sup></a></p>
              </>}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

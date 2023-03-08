import { useState } from "react";
import axios from "axios";
import { WeatherInfo } from "./WeatherInfo";

function Weather(props: WeatherInfo) {
  return (
    <>
      <div>
        <p>
          Temp: {props.main?.temp} &#8451;<br />
          Feels like: {props.main?.feels_like} &#8451;<br />
          Temp min: {props.main?.temp_min} &#8451;<br />
          Temp max: {props.main?.temp_max} &#8451;<br />
          Humidity: {props.main?.humidity}%<br />
          Pressure: {props.main?.pressure} hPa<br />
        </p>
      </div>
    </>
  )
}

export default Weather;
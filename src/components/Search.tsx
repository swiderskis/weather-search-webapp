import { useState, useEffect } from "react";
import axios from "axios";
import { Weather } from "./";
import { WeatherInfo } from "./WeatherInfo";

interface SearchProps {
  apiKey: string
}

interface SearchResult {
  name?: string,
  country?: string,
  lon?: number,
  lat?: number
}

function Search(props: SearchProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cityDetails, setCityDetails] = useState<SearchResult>({});
  const [citySelected, setCitySelected] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({});

  // Makes weather API request when city is selected
  useEffect(() => {
    if (citySelected === true) {
      const req = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityDetails.lat}&lon=${cityDetails.lon}&appid=${props.apiKey}&units=metric`)
        .then(res => {
          setWeatherInfo(res.data);
          console.log(weatherInfo);
        })
        .catch(error => {
          setIsError(true);
          setErrorMessage(error.message);
        })
    }
  }, [cityDetails]);

  // Gets results from city search API request
  const searchCity = (e: any) => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    setCitySelected(false);

    const req = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${props.apiKey}&limit=5`)
      .then(res => {
        setIsError(false);
        setSearchResults(res.data);
        setIsLoaded(true);
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error.message);
      })
  }

  // Sets city details when selecting city from list
  const selectCity = (index: number) => {
    setCityDetails({ name: searchResults[index].name, country: searchResults[index].country, lon: searchResults[index].lon, lat: searchResults[index].lat });
    setIsLoaded(false);
    setCitySelected(true);
  }

  return (
    <>
      <div>
        <div>
          <form onSubmit={searchCity}>
            <input type="text" placeholder="Enter a city name" name="city"></input>
            <button>Search City</button>
          </form>
        </div>

        {isLoaded ?
          <div>
            <ul>
              {searchResults.map((searchResults, index) => (
                <li key={index}>
                  {searchResults.name}, {searchResults.country} <button onClick={() => selectCity(index)}>Select</button>
                </li>
              ))}
            </ul>
          </div>
          : null}

        {searchResults.length === 0 && isLoaded ? <div><p>No results found</p></div> : null}
      </div>

      {isError ? <div><p>{errorMessage}</p></div> : null}

      {citySelected ? <Weather main={weatherInfo.main} /> : null}
    </>
  );
}

export default Search;
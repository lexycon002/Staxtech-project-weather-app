import { useRef, useState } from "react";
import ForeCast from "./components/ForeCast";
import SearchOption from "./components/SearchOption";
import Weather from "./components/Weather";
import { weatherCodes } from "./constant";
import NoResultOption from "./components/NoResultOption";
import { useEffect } from "react";

const App = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const[currentWeather, setCurrentWeather] = useState({})
  const[getHourData, setGetHourData]= useState([])
  const[noResult, setNoResult] = useState(false);
  const searchInputReference = useRef(null)

  const filterhourData = (timeData) => {
    const currentTime = new Date().setMinutes(0,0,0);
    const next24Hours = currentTime + 24 * 60 * 60 * 1000;

    // Filtering the hour data to just 24 hours
    const next24hourData = timeData.filter(({time}) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentTime && forecastTime <= next24Hours;
    })

    setGetHourData(next24hourData)
  }

  // Fetching the API 
  const getWeatherDetails = async (API_URL) => {
    setNoResult(false);
    window.innerWidth <= 768 && searchInputReference.current.focus();

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        // Getting the temperature, description and weather icons from the API
        const temperature = Math.floor(data.current.temp_c);
        const desc = data.current.condition.text;
        const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));
        
        setCurrentWeather({ temperature, desc, weatherIcon });

        // Get the hours from the API data, guard against missing forecastday[1]
        const hourData = [
          ...data.forecast.forecastday[0].hour,
          ...(data.forecast.forecastday[1] ? data.forecast.forecastday[1].hour : [])
        ];

        if (searchInputReference.current) {
          searchInputReference.current.value = data.location.name;
        }
        filterhourData(hourData)
    } catch {
      setNoResult(true);
    }
  };
  // Setting my default location as Nigeria
  useEffect(() => {
        const defaultLocation = "Nigeria";
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultLocation}&days=2`;
        getWeatherDetails(API_URL);
  },[]);

  return (
    <div className="container">
      {/* Search  Section */}
      <SearchOption  getWeatherDetails={getWeatherDetails} searchInputReference={searchInputReference}/>
      {/* Weather Section */}
      {noResult ? (
        <NoResultOption />
      ) : (
        <div className="weather-section">
          <Weather currentWeather={currentWeather} />
          {/* Hourly Forecast section */}
          <div className="hourly-forecast">
            <ul className="weather-list">
              {getHourData.map((timeWeather) => (
                <ForeCast getHourData={timeWeather} currentWeather={currentWeather} key={timeWeather.time_epoch}/>
              ))}
            </ul>
          </div>
        </div>
      )
    }
    </div>
  )
}

export default App
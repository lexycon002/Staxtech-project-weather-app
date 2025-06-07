
const Weather = ({ currentWeather }) => {

  
  return (
    <>
        <div className="current-weather">
          <img src={`/assets/icons/${currentWeather.weatherIcon}.svg`} className="weather-icon"/>
            <h2 className="temperature">{currentWeather.temperature}<span> °C</span></h2>
            <p className="description">{currentWeather.desc}</p>
        </div>
    </>
  )
}

export default Weather
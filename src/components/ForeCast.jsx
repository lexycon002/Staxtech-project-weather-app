const ForeCast = ( { currentWeather , getHourData  }) => {

  const temperature = Math.floor(getHourData.temp_c);
  const time = getHourData.time.split(" ")[1].substring(0, 5);
  return (
    <div>
        <li className="weather-item">
            <p className="time">{time}</p>
            <img src={`/assets/icons/${currentWeather.weatherIcon}.svg`} className="weather-icon" />
            <p className="time">{temperature}°C</p>
        </li>
    </div>
  )
}

export default ForeCast
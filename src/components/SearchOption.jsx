import { IoSearch } from "react-icons/io5";
import { MdOutlineMyLocation } from "react-icons/md";


const SearchOption = ( { getWeatherDetails, searchInputReference}) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const handleSearch = (e) => {
        e.preventDefault();
        const searchInput = e.target.querySelector(".search-input");
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
        getWeatherDetails(API_URL)
    
    }
    const handleLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                // Getting user current location 
                const { latitude, longitude } = position.coords
                const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
                    getWeatherDetails(API_URL)
                
                    window.innerWidth >= 768 && searchInputReference.current.focus();
            }, 
            () => {
                alert("Access denied, please enter your current location");
            }
        ) 
    }
    return (
        <div className="search-section">
            <form action="#" className="search-form" onSubmit={handleSearch}>
                <span className="material-icons-round"><IoSearch /></span>
                <input type="search" placeholder='Enter a city name' ref={searchInputReference} className="search-input" required/>
            </form>
            <button className="location-button" onClick={handleLocation}>
                <span className="material-icons-round"><MdOutlineMyLocation /></span>
            </button>
        </div>
    )
}

export default SearchOption
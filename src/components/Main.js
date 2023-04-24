import "./Main.css";
import { useState } from 'react';

function Main({ apiGetCoordinates, temp, description, icon, setUnits, isCelsius, setIsCelsius, units, city, setCity }) {
    const [inputValue, setInputValue] = useState('');
    
    // const handleSearchCoordinates = () => {
    //     apiGetCoordinates(city); // wait for the coordinates to be fetched before making the request for weather data
    //     apiGetWeather(lat, lon);
    // }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const enterKeyPressed = (e) => {
        if (e.keyCode === 13) {
            console.log(e.target.value);
            setCity(e.target.value);
            apiGetCoordinates(e.target.value); 
            // apiGetWeather(lat, lon);
            setInputValue('');
        }     
    }

    const handleUnitsClick = () => {
        if (units === 'metric') {
            setUnits('imperial');
            setIsCelsius(false);
          } else {
            setUnits('metric');
            setIsCelsius(true);
          }
    }
    
    return (
        <div>
            <div className="container">
                <div className="section section__inputs">
                {/* <input onKeyDown={enterKeyPressed} onChange={handleInputChange} type="text" placeholder="Enter City..."></input> */}
                    <input onKeyDown={enterKeyPressed} type="text" placeholder="Enter City..." value={inputValue} onChange={handleInputChange}></input>
                    {/* <button onClick={hanadleSearchCoordinates}>Search Coordinates</button> */}
                    <button onClick={handleUnitsClick}>{isCelsius ? 'convert to F' : 'convert to °C'}</button>
                </div>
            
            <div className="section section__icon__temperature">
                <div className="icon">
                    <h3>{city}</h3>
                    {icon && (
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
                    )}
                    <h3>{description}</h3>
                </div>

                
                <div className="temperature">
                    <h2><span>{temp}</span><span className="degree-unit"> {isCelsius ? '°C' : 'F'}</span></h2>
                </div>
                
            </div>
            
        </div>
        </div>
        
    )
}

export default Main;
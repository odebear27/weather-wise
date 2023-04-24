import { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main';
import coldBg from './assets/cold.jpg';
import hotBg from './assets/hot.jpg';
import fairBg from './assets/fair.jpg';
import weatherService from './weatherService';
import Details from './components/Details';

const initialWeather = {
  temp: null,
  description: null,
  icon: null
}

function App() {
  
  const [coordinates, setCoordinates] = useState({});
  const [weather, setWeather] = useState(initialWeather);
  const [bg, setBg] = useState(hotBg);
  const [units, setUnits] = useState('imperial');
  const [isCelsius, setIsCelsius] = useState(false);
  const [city, setCity] = useState('');

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
      apiGetWeather(coordinates.lat, coordinates.lon, units);
    }
  }, [coordinates]);

  useEffect(() => {
    if (weather.temp !== null) {
      if ((!isCelsius && weather.temp <= 50) || (isCelsius && weather.temp <= 10)) {
        setBg(coldBg);
      } else if ((!isCelsius && weather.temp <= 90) || (isCelsius && weather.temp <= 32)) {
        setBg(fairBg);
      } else {
        setBg(hotBg);
      }
    }
  }, [weather.temp]);

  useEffect(() => {
    apiGetWeather(coordinates.lat, coordinates.lon, units);
  }, [units]);

  const apiGetCoordinates = async (city) => {
    try {
      const response = await weatherService.getCoordinates(city);
      // console.log('GET status', response.status);
      // console.log('GET data', response.data);

      const {
        lat,
        lon,
        name
      }= response.data[0];

      console.log(lat, lon, name);

      setCoordinates({ lat, lon, name });

    } catch (error) {
      console.log(error);
    }
  }

  const apiGetWeather = async (lat, lon, units) => {
    try {
      const response = await weatherService.getWeather(lat, lon, units);
      console.log('GET status', response.status);
      console.log('GET data', response.data);

      const {
        main: { temp, feels_like, temp_min, temp_max },
        weather,
        wind: {speed}
      } = response.data;

      const {description, icon} = weather[0];

      setWeather({temp, description, icon, feels_like, temp_min, temp_max, speed});

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        <Main apiGetCoordinates={apiGetCoordinates} apiGetWeather={apiGetWeather} lat={coordinates.lat} lon={coordinates.lon} temp={weather.temp} description={weather.description} icon={weather.icon} setUnits={setUnits} isCelsius={isCelsius} setIsCelsius={setIsCelsius} units={units} city={city} setCity={setCity} />
        {/* <p>Latitude: {coordinates.lat}</p>
        <p>Longitude: {coordinates.lon}</p>
        <p>City: {coordinates.name}</p> */}
        <Details feels_like={weather.feels_like} temp_min={weather.temp_min} temp_max={weather.temp_max} speed={weather.speed} isCelsius={isCelsius} />
      </div>
    </div>
    
  );
}

export default App;

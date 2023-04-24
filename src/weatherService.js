import axios from "axios";

// const API_KEY = "7a195e0df95dfc041e20428a47b56568";

const getCoordinates = (city) => {
    const GET_COORDINATES_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API_KEY}`;

    return axios.get(GET_COORDINATES_URL);
}

const getWeather = (lat, lon, units ) => {
    const GET_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;

    return axios.get(GET_WEATHER_URL);
}

export default {
    getCoordinates,
    getWeather
  };
// Weather service api

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY // Api avain, joka on tallennettu .env tiedostoon

const getCurrentWeather = (lat, lon) => {
  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${lat}&lon=${lon}` +
    `&units=metric&lang=fi&appid=${API_KEY}`

  return fetch(url).then(response => response.json())
}

export default { getCurrentWeather }
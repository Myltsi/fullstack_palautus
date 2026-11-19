// Country komponentti, joka näyttää yksittäisen maan tiedot

import { useEffect, useState } from 'react'
import weatherService from '../services/Weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const [lat, lon] = country.capitalInfo.latlng

    weatherService.getCurrentWeather(lat, lon)
      .then(data => {
        setWeather(data)
      })
  }, [country])

  return (
    <section>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area}</p>
    
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages ?? {}).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} />

      {weather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </section>
  )
}

export default Country
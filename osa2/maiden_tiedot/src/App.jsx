// appi maiden tietojen hakemiseen ja näyttämiseen

import { useEffect, useState } from 'react'  

// components
import Search from './components/Search' // komponentti hakukentälle
import CountriesList from './components/CountriesList' // komponentti maiden listalle
import Country from './components/Country' // komponentti yksittäisen maan tiedoille
// services
import countryService from './services/countries' // palvelu maiden tietojen hakemiseen
  
const App = () => {
    
    useEffect(() => {
      countryService.getAll()
        .then(allCountries => {
        setCountries(allCountries)
      })
}, [])
 
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const countriesToShow = countries.filter(country =>
  country.name.common.toLowerCase().includes(search.toLowerCase())
)

  const onShowCountry = (country) => {
    setSearch(country.name.common)
  }

  
  // kontentin määritys riippuen siitä kuinka monta maata on haun tuloksena

  let content

  if (countriesToShow.length === 1) {
    content = <Country country={countriesToShow[0]} />
  } else if (countriesToShow.length <= 10) {
    content = <CountriesList countries={countriesToShow} onShowCountry={onShowCountry} />
  } else {
    content = (
      <p>Too many matches, specify another filter</p>
    )
  }

  return (
    <div>
      <h1>Find countries</h1>
      <div>
        <Search search={search} setSearch={setSearch} />
      </div>
      {content}
    </div>
  )
}

export default App
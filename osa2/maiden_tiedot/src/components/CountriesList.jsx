// CountriesList komponentti, joka näyttää listan maista ja "Show" -painikkeen jokaiselle maalle

const CountriesList = ({ countries, onShowCountry }) => (
  <>
    {countries.map(country => (
      <p key={country.name.common}>
        {country.name.common}
        <button onClick={() => onShowCountry(country)}>
          Show 
        </button>
      </p>
    ))}
  </>
)

export default CountriesList

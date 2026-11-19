// ============================================================
// React-komponentin yleinen pohja
// Kopioi tämä tiedosto tehtävän oman App.jsx-tiedoston pohjaksi.
// Poista kommentit ja osiot, joita tehtävässä ei tarvita.
// ============================================================

// 1. Importit
// Pidä importit tiedoston alussa. Poista käyttämättömät importit.
import { useEffect, useState } from 'react'

// 2. Vakiot ja apufunktiot
// Tähän sopivat esimerkiksi API-osoitteet ja uudelleenkäytettävät
// funktiot, jotka eivät tarvitse komponentin statea tai propseja.
const API_URL = 'https://example.com/api/items'

const formatItemName = (item) => {
  return item.name.trim()
}

// 3. Pääkomponentti
const App = () => {
  // 4. State
  // Sijoita kaikki komponentin state-muuttujat samaan kohtaan.
  const [items, setItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 5. Muut hookit
  // Käytä effectiä esimerkiksi datan hakemiseen tai selaimen
  // ulkopuoliseen toimintaan. Muista riippuvuustaulukko.
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Datan hakeminen epäonnistui')
        }

        const data = await response.json()
        setItems(data)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  // 6. Event handlerit
  // Tähän tulevat käyttäjän toimintoihin liittyvät funktiot.
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleRemoveItem = (itemId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    )
  }

  // Esimerkki uuden tapahtumakäsittelijän rakenteesta:
  // const handleAddItem = (newItem) => {
  //   setItems((currentItems) => [...currentItems, newItem])
  // }

  // 7. Johdetut arvot
  // Laske suodatetut tai muuten käsitellyt arvot ennen return-lausetta.
  const visibleItems = items.filter((item) =>
    formatItemName(item).toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 8. Palautettava JSX
  // Järjestä käyttöliittymä käyttäjän näkökulmasta loogiseen järjestykseen.
  return (
    <main>
      <h1>Otsikko</h1>

      <label htmlFor="search">Haku</label>
      <input
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {loading && <p>Ladataan...</p>}
      {error && <p role="alert">{error}</p>}

      <ul>
        {visibleItems.map((item) => (
          <li key={item.id}>
            {formatItemName(item)}
            <button type="button" onClick={() => handleRemoveItem(item.id)}>
              Poista
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}

// 9. Export
// Export tehdään yleensä tiedoston lopussa.
export default App

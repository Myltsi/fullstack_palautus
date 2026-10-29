import { useState } from 'react'

const App = () => {
  // persons sisältää kaikki puhelinluettelon henkilöt.
  // setPersons päivittää persons-taulukon.
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  // newName sisältää input-kentän tämänhetkisen tekstin.
  // setNewName muuttaa newName-arvoa.
  const [newName, setNewName] = useState('')

  // Tämä funktio suoritetaan aina, kun input-kentän sisältö muuttuu.
  const handleNewName = (event) => {
    // event.target.value on input-kentän uusi arvo.
    console.log(event.target.value)

    // Päivitetään newName uudella arvolla.
    // Tämä päivittää myös input-kentän, koska input käyttää value={newName}.
    setNewName(event.target.value)
  }

  // Tämä funktio suoritetaan, kun lomake lähetetään
  const addName = (event) => {
    event.preventDefault()

    // Luodaan uusi henkilö käyttäjän kirjoittamasta nimestä.
    const nameObject = {
      name: newName,
    }

    // concat luo uuden taulukon, jossa ovat sekä vanhat että uusi henkilö.
    setPersons(persons.concat(nameObject))

    // Tyhjennetään input-kenttä lisäämisen jälkeen.
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Kun lomake lähetetään, addName-funktio suoritetaan. */}
      <form onSubmit={addName}>
        <div>
          name:

          {/* value näyttää newName-tilan arvon input-kentässä.
              onChange suorittaa handleNewName-funktion kirjoitettaessa. */}
          <input
            value={newName}
            onChange={handleNewName}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      {/* map käy jokaisen persons-taulukon henkilön läpi.
          key auttaa Reactia tunnistamaan jokaisen listan rivin. */}
      {persons.map(person => (
        <p key={person.name}>
          {person.name}
        </p>
      ))}
    </div>
  )
}

export default App
import { useState } from 'react'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Search from './components/Search.jsx'

const App = () => {
  // persons sisältää kaikki puhelinluettelon henkilöt.
  // setPersons päivittää persons-taulukon.
  const [persons, setPersons] = useState([ //testidata
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  // newName sisältää input-kentän tämänhetkisen tekstin.
  // setNewName muuttaa newName-arvoa.
  const [newName, setNewName] = useState('')
  const [search, setSearch] = useState('')

  // newNumber sisältää input-kentän tämänhetkisen tekstin.
  // setNewNumber muuttaa newNumber-arvoa.
  const [newNumber, setNewNumber] = useState('')

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  // Tämä funktio suoritetaan aina, kun input-kentän sisältö muuttuu.
  const handleNewName = (event) => {
    // event.target.value on input-kentän uusi arvo.
    console.log(event.target.value)

    // Päivitetään newName uudella arvolla.
    // Tämä päivittää myös input-kentän, koska input käyttää value={newName}.
    setNewName(event.target.value)
  }

  const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(search.toLowerCase())
)

  // Tämä funktio suoritetaan, kun lomake lähetetään
  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} on jo luettelossa`)
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <Search search={search} setSearch={setSearch} />
      </div>

      <h2>Add number:</h2>  

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addName={addName}
      />    

      <h2>Numbers</h2>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
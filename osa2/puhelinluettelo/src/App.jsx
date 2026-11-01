import Services from './components/Services.jsx'
import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Search from './components/Search.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  useEffect(() => {
     Services
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
}, [])

  const [newName, setNewName] = useState('')
  const [search, setSearch] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(search.toLowerCase())
)

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

  noteService
      .create(noteObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

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
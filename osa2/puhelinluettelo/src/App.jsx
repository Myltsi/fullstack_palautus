import './index.css'
import Notification from './components/Notification.jsx'
import Services from './components/Services.jsx'
import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Search from './components/Search.jsx'

const App = () => {

  useEffect(() => {
     Services
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
}, [])
 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [search, setSearch] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      const confirmUpdate = window.confirm(`${newName} on jo luettelossa, haluatko päivittää numeron?`)
      if (confirmUpdate) {
        const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        const updatedPerson = { ...person, number: newNumber }
        
        Services
          .update(person.id, updatedPerson)
          .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
              setNewName('')
              setNewNumber('')
    
              setSuccessMessage(`Person ${person.name} was updated in the phonebook`)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
          })
          .catch(error => {
            console.error(error)
            setErrorMessage(
              `Updating person ${person.name} failed.`
            )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }
    
    else {
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    Services
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        
        setSuccessMessage(
          `Added ${nameObject.name} to the phonebook`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })  
      .catch(error => {
          console.error(error)
          setErrorMessage(
            `Adding person ${nameObject.name} failed.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
  }

  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Haluatko varmasti poistaa ${person.name}?`)

    if (confirmDelete) {
      Services
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setSuccessMessage(`Deleted ${person.name} from the phonebook`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error(error)
          setErrorMessage(
            `Deleting person ${person.name} failed.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
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

      <Persons 
      persons={personsToShow}
      onDeletePerson={deletePerson}
       />
    </div>
  )
}

export default App
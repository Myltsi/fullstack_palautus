const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())

// morgan middleware for logging HTTP requests
//token for logging request body
morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  },
  {
    id: "5",
    name: "Sanna Korhonen",
    number: "050-1234567"
  },
  {
    id: "6",
    name: "Matti Meikäläinen",
    number: "045-7654321"
  },
  {
    id: "7",
    name: "Liisa Virtanen",
    number: "040-1112233"
  },
  {
    id: "8",
    name: "Juha Laine",
    number: "044-9876543"
  },
  {
    id: "9",
    name: "Anna Lehtinen",
    number: "050-2468135"
  },
  {
    id: "10",
    name: "Jukka Nieminen",
    number: "041-1357246"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>This is the phonebook!</h1>')
})

app.get('/info', (request, response) => {
  response.send('<h1>Phonebook has info for ' + persons.length + ' people</h1>'
    + '<p>' + new Date() + '</p>'
  )
})

// Get a specific person by ID
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
 
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Delete a specific person by ID
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


// Add a new person
// generate a new ID for the person
const generateId = () => {
  const id = Math.random()
    return String(id)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  if (persons.some(person =>
  person.name.toLowerCase() === body.name.toLowerCase())) {
  return response.status(400).json({
    error: 'name must be unique'
  })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
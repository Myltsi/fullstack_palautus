import { useState } from 'react'

const App = () => {
  // App omistaa anekdoottien sisällön. Jokaisen anekdootin paikka
  // tässä taulukossa vastaa samaa paikkaa votes-taulukossa.
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  // selected kertoo, mikä anekdootti anecdotes-taulukosta on parhaillaan valittu.
  const [selected, setSelected] = useState(0)

  // votes sisältää jokaisen anekdootin äänimäärän.
  // Esimerkiksi votes[2] on anecdotes[2]-anekdootin äänimäärä.
  const [votes, setVotes] = useState(new Array(8).fill(0))

  return (
    <div>
      <h1>Anecdote of the day</h1>

      {/* App välittää Anecdote-komponentille tiedot ja toiminnallisuudet propseina. */}
      {/* onNext ja onVote suoritetaan vasta, kun lapsikomponentin nappia painetaan. */}
      <Anecdote
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        onNext={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
        onVote={() => {
          // Luodaan uusi taulukko, jotta React huomaa tilan muuttuneen.
          const newVotes = [...votes]
          newVotes[selected] += 1
          setVotes(newVotes)
        }}
      />

      <h1>Anecdote with most votes</h1>
      {/* Tämä komponentti saa koko aineiston ja etsii itse eniten ääniä saaneen. */}
      <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )

}

const Anecdote = ({ anecdote, votes, onNext, onVote }) => {
  return (
    <div>
      {/* Anecdote näyttää App-komponentilta saamansa anekdootin ja äänimäärän. */}
      <div>{anecdote}</div>
      <div>has {votes} votes</div>

      {/* Button saa toiminnon Anecdote-komponentilta ja kutsuu sitä painettaessa. */}
      <Button handleClick={onNext} text="Next anecdote" />
      <Button handleClick={onVote} text="Vote" />
    </div>
  )
}

const AnecdoteWithMostVotes = ({ anecdotes, votes }) => {
  // Math.max etsii suurimman äänimäärän ja indexOf etsii sen paikan.
  const maxVotes = Math.max(...votes)
  const indexOfMaxVotes = votes.indexOf(maxVotes)

  return (
    <div>
      <div>{anecdotes[indexOfMaxVotes]}</div>
      <div>has {maxVotes} votes</div>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  // Button on yleiskäyttöinen: se ei tiedä, mitä handleClick tekee.
  // Se vain näyttää text-propin ja kutsuu handleClick-funktion.
  <button onClick={handleClick}>
    {text}
  </button>
)

export default App
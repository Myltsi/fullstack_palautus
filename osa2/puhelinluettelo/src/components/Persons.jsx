const Persons = ({ persons, onDeletePerson }) => (
  <>
    {persons.map(person => (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => onDeletePerson(person.id)}>
          delete
        </button>
      </p>
    ))}
  </>
)

export default Persons
const PersonForm = ({
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
  addName
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNewName}
        />
      </div>

      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNewNumber}
        />
      </div>

      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const hasNewName = persons.some((person) => {
      return person.name === newName;
    });

    if (hasNewName) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
    }
  };

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value);
  };

  const filteredPersons = persons.filter((dict) =>
    Object.values(dict).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(filterWord)
    )
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <p>Filter shown with: </p>
      <input value={filterWord} onChange={handleFilterChange} />

      <h2>Add new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        );
      })}

      {persons.filter((person) => Object.values(person).includes(filterWord))}
    </div>
  );
};

export default App;

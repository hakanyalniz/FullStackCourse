import { useState } from "react";
import Filter from "./components/Filter/Filter";
import AddPerson from "./components/AddPerson/AddPerson";
import Numbers from "./components/Numbers/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [filterWord, setFilterWord] = useState("");

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

      <Filter filterWord={filterWord} handleFilterChange={handleFilterChange} />

      <AddPerson persons={persons} setPersons={setPersons} />

      <Numbers filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import axios from "axios";

import Filter from "./components/Filter/Filter";
import AddPerson from "./components/AddPerson/AddPerson";
import Numbers from "./components/Numbers/Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filterWord, setFilterWord] = useState("");

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value);
  };

  // Go through persons array
  // check each dictionaries value
  // see if it is a string and if so see if it matches filterWord
  // return true if so
  // the dictionary we returned true on will become an item in new array
  const filteredPersons = persons.filter((dict) =>
    Object.values(dict).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(filterWord)
    )
  );

  useEffect(() => {
    axios.request("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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

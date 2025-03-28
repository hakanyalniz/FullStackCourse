import { useState } from "react";
import axios from "axios";

const AddPerson = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
      axios
        .post("http://localhost:3001/persons", {
          name: newName,
          number: newNumber,
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  return (
    <>
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
    </>
  );
};

export default AddPerson;

import { useState } from "react";
import personService from "../../services/persons";

const AddPerson = ({ persons, setPersons, handleSuccessNotification }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  let personFoundID;

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
      personFoundID = person.id;
      return person.name === newName;
    });

    const hasNewNumber = persons.some((person) => {
      return person.number === newNumber;
    });

    if (hasNewName && !hasNewNumber) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )
      )
        return;

      personService
        .updatePerson({
          name: newName,
          number: newNumber,
          id: personFoundID,
        })
        .then(() => {
          personService.getAll().then((response) => setPersons(response));
        });

      handleSuccessNotification(`${newName}'s number has been changed`);
    } else if (hasNewName) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      // setPersons([...persons, { name: newName, number: newNumber }]);

      // Add the new person to the server database, then refresh the local person database from the server
      // we do this because the server automatically ids the data
      // There are several ways to make this more efficient, such as creating our own ids, or just fetching the latest update
      personService
        .addPerson({
          name: newName,
          number: newNumber,
        })
        .then((response) => {
          console.log(response);
          personService.getAll().then((response) => setPersons(response));
        });

      handleSuccessNotification(`${newName} added to the phonebook`);
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

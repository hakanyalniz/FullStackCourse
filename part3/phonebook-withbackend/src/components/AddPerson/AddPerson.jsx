import { useState } from "react";
import personService from "../../services/persons";

const AddPerson = ({ persons, setPersons, handleSuccessNotification }) => {
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

    const hasNewNumber = persons.some((person) => {
      return person.number === newNumber;
    });

    // If the name is found but the number is different, change the number
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
        })
        .then(() => {
          personService.getAll().then((response) => setPersons(response));
        })
        .catch((error) => {
          handleSuccessNotification(
            `${newName}'s information has not been found`
          );
          // since there is information sync problem, update the local data from server
          personService.getAll().then((response) => setPersons(response));
          console.log(error);
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
        .then(
          (response) => {
            console.log(response);
            personService.getAll().then((response) => setPersons(response));
            handleSuccessNotification(`${newName} added to the phonebook`);
          },
          (error) => {
            console.error(error.message);
            if (error.response.data.error === "ValidationError") {
              handleSuccessNotification(`Validation error occured`);
            } else {
              handleSuccessNotification(`${newName}'s number is missing`);
            }
          }
        );
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

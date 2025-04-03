import { useEffect, useState, useRef } from "react";
import personService from "./services/persons";

import Filter from "./components/Filter/Filter";
import AddPerson from "./components/AddPerson/AddPerson";
import Numbers from "./components/Numbers/Numbers";
import Notification from "./components/Notification/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [filterWord, setFilterWord] = useState("");
  let timeoutID = useRef();

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value);
  };

  const handleSuccessNotification = (message) => {
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
    }

    setNotificationMessage(message);

    // clean the timeout so if the user clicks multiple times, they do not interfare with each other
    // use useRef, so the timeout IDs persist between renders
    timeoutID.current = setTimeout(() => {
      setNotificationMessage("");
    }, 5000);
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
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  useEffect(() => {
    console.log(persons);
  }, [persons]);

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Phonebook</h2>

      <Filter filterWord={filterWord} handleFilterChange={handleFilterChange} />

      <AddPerson
        persons={persons}
        setPersons={setPersons}
        handleSuccessNotification={handleSuccessNotification}
      />

      <Numbers
        filteredPersons={filteredPersons}
        deletePerson={personService.deletePerson}
        setPersons={setPersons}
        handleSuccessNotification={handleSuccessNotification}
      />
    </div>
  );
};

export default App;

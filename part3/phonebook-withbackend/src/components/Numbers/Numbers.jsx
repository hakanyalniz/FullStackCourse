const Numbers = ({
  filteredPersons,
  deletePerson,
  setPersons,
  handleSuccessNotification,
}) => {
  const handleDeletePerson = (currentPerson) => {
    if (!window.confirm(`Delete ${currentPerson.name}?`)) return;
    console.log("Inside handleDeletePerson,", currentPerson);

    deletePerson(currentPerson)
      .then((response) => {
        // After delete, we return an updated list, set the Persons to that
        setPersons(response);
      })
      .catch((error) => {
        console.log("An error occured", error);
      });
    handleSuccessNotification(
      `${currentPerson.name} has been deleted from phonebook`
    );
  };

  return (
    <>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDeletePerson(person)}>delete</button>
          </div>
        );
      })}
    </>
  );
};

export default Numbers;

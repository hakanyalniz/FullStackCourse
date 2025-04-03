const Numbers = ({
  filteredPersons,
  deletePerson,
  setPersons,
  handleSuccessNotification,
}) => {
  const handleDeletePerson = (currentPerson) => {
    if (!window.confirm(`Delete ${currentPerson.name}?`)) return;

    deletePerson(currentPerson.id).then((response) => {
      setPersons((persons) =>
        persons.filter((item) => {
          return item.id !== response.id;
        })
      );
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

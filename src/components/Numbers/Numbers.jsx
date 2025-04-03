const Numbers = ({
  filteredPersons,
  deletePerson,
  setPersons,
  handleSuccessNotification,
}) => {
  const handleDeletePerson = (currentPerson) => {
    if (!window.confirm(`Delete ${currentPerson.name}?`)) return;

    deletePerson(currentPerson.id).then((response) => {
      // when deleting, delete route returns the full list back
      // which doesnt work for setPersons, which is only expecting the deleted element
      console.log("inside delete", response);

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

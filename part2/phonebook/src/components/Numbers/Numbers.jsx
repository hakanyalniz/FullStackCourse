const Numbers = ({ filteredPersons, deletePerson, setPersons }) => {
  const handleDeletePerson = (currentPerson) => {
    if (!window.confirm(`Delete ${currentPerson.name}?`)) return;

    deletePerson(currentPerson.id).then((response) => {
      setPersons((persons) =>
        persons.filter((item) => {
          return item.id !== response.id;
        })
      );
    });
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

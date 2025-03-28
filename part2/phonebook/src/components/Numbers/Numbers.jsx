const Numbers = ({ filteredPersons, deletePerson, setPersons }) => {
  const handleDeletePerson = (personID) => {
    deletePerson(personID).then((response) => {
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
            <button onClick={() => handleDeletePerson(person.id)}>
              delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Numbers;

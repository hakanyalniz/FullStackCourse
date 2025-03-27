const Numbers = ({ filteredPersons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        );
      })}
    </>
  );
};

export default Numbers;

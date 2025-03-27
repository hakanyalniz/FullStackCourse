const Filter = ({ filterWord, handleFilterChange }) => {
  return (
    <>
      <p>Filter shown with: </p>
      <input value={filterWord} onChange={handleFilterChange} />
    </>
  );
};

export default Filter;

import "./SearchBar.css";

function SearchBar({ className = "", searchIndex, setSearchIndex }) {
  const handleInputChange = (event) => {
    setSearchIndex(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={searchIndex}
        onChange={handleInputChange}
        className={`searchBarDefault ${className}`}
      />
    </>
  );
}

export default SearchBar;

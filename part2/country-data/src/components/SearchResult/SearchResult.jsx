import "./SearchResult.css";

function SearchResult({ allCountries, searchIndex }) {
  if (
    searchIndex === null ||
    searchIndex === undefined ||
    searchIndex.length === 0
  )
    return;

  const filteredSearchResult = allCountries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(searchIndex.toLowerCase());
  });

  return (
    <>
      {/* If there is only one result left, render the first condition, otherwise render the first 10 countries */}
      {filteredSearchResult.length === 1 ? (
        // First case
        <div className="country-element">
          <h1>{filteredSearchResult[0].name.common}</h1>
          <h1>
            {filteredSearchResult[0].altSpellings.map((altSpelling) => {
              <div>{altSpelling}</div>;
            })}
          </h1>
          <div>
            <img
              src={filteredSearchResult[0].flags.png}
              alt="a counties coat of arm"
              className="coat-of-arms"
            />
            <img
              src={filteredSearchResult[0].coatOfArms.png}
              alt="a counties coat of arm"
              className="coat-of-arms"
            />
          </div>

          <table className="country-element">
            <tbody>
              <tr>
                <th>Capital</th>
                <td>{filteredSearchResult[0].capital[0]}</td>
              </tr>

              <tr>
                <th>Car Direction</th>
                <td>{filteredSearchResult[0].car.side}</td>
              </tr>

              <tr>
                <th>Continent</th>
                <td>{filteredSearchResult[0].continents[0]}</td>
              </tr>

              <tr>
                <th>Currency</th>
                <td>
                  {Object.values(filteredSearchResult[0].currencies).map(
                    (element) => {
                      return <div>{element.name}</div>;
                    }
                  )}
                </td>
              </tr>

              <tr>
                <th>Language</th>
                <td>
                  {Object.values(filteredSearchResult[0].languages).map(
                    (element) => {
                      return <div>{element}</div>;
                    }
                  )}
                </td>
              </tr>

              <tr>
                <th>Population</th>
                <td>{filteredSearchResult[0].population}</td>
              </tr>

              <tr>
                <th>Timezone</th>
                <td>{filteredSearchResult[0].timezones[0]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        // Second case
        filteredSearchResult.splice(0, 10).map((element, index) => {
          return (
            <div key={index} className="country-element">
              {element.name.common}
            </div>
          );
        })
      )}
    </>
  );
}

export default SearchResult;

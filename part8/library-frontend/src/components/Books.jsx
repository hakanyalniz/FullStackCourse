import { useEffect, useState } from "react";

const Books = ({ result }) => {
  const [genreList, setGenreList] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("ALL");

  useEffect(() => {
    // Go through the books and list all the genres
    // Do not add a genre if it already exists in the list
    let temporaryList = [];
    books.map((book) => {
      // see if the current genre being mapped exists in the list
      // if it exists, skip it
      temporaryList.includes(book.genres.toString())
        ? null
        : temporaryList.push(...book.genres);
    });
    setGenreList(temporaryList);
  }, [books]);

  if (result.loading) {
    return <div>loading...</div>;
  } else {
    // To prevent a render loop with the above useEffect, we check if books is empty before assigning value to it
    if (books.length === 0) {
      setBooks(result.data.allBooks);
    }
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => {
            if (currentGenre === "ALL") {
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              );
            } else if (a.genres.includes(currentGenre)) {
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => setCurrentGenre("ALL")}>All</button>

        {genreList.map((genre, index) => {
          return (
            <button onClick={() => setCurrentGenre(genre)} key={index}>
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Books;

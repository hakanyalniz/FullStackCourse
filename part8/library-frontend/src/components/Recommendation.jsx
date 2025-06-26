import { useQuery } from "@apollo/client";

import { CURRENT_USER } from "../queries";

const Recommendation = ({ allBooks }) => {
  const curentUserResult = useQuery(CURRENT_USER);
  console.log(curentUserResult);

  const favoriteGenre = curentUserResult.data
    ? curentUserResult.data.me.favoriteGenre
    : null;

  let books = allBooks.data;

  if (allBooks.loading) {
    return <div>loading...</div>;
  } else {
    books = allBooks.data.allBooks;
  }

  return (
    <div>
      <h1>Recommendation</h1>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => {
            if (book.genres.includes(favoriteGenre)) {
              return (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;

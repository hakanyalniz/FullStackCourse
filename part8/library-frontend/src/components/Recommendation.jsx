import { useQuery } from "@apollo/client";

import { CURRENT_USER, RECOMMENDED_BOOKS } from "../queries";

const Recommendation = () => {
  const curentUserResult = useQuery(CURRENT_USER);
  const favoriteGenre = curentUserResult.data
    ? curentUserResult.data.me.favoriteGenre
    : null;
  const recommendedBookResult = useQuery(RECOMMENDED_BOOKS, {
    variables: { genre: favoriteGenre },
  });

  let books;

  if (recommendedBookResult.loading) {
    return <div>loading...</div>;
  } else {
    books = recommendedBookResult.data.allBooks;
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
            return (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;

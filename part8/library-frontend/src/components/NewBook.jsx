import { useState } from "react";
import {
  ADD_BOOK,
  ALL_BOOKS,
  ALL_PERSONS,
  RECOMMENDED_BOOKS,
  CURRENT_USER,
} from "../queries";
import { useMutation, useQuery } from "@apollo/client";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  // The below code was taken from the recommendation component so we can include the favoriteGenre variable in the mutation update
  const curentUserResult = useQuery(CURRENT_USER);
  const favoriteGenre = curentUserResult.data
    ? curentUserResult.data.me.favoriteGenre
    : null;

  const [addBookMutation] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_PERSONS },
      {
        query: RECOMMENDED_BOOKS,
        variables: { genre: favoriteGenre },
      },
    ],
  });

  const submit = async (event) => {
    event.preventDefault();

    const integerPublished = parseInt(published);

    const result = addBookMutation({
      variables: { genres, author, published: integerPublished, title },
    });
    console.log("Book added!", result);

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

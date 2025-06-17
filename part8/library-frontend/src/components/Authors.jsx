import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR_BIRTHDAY, ALL_PERSONS } from "../queries";

const Authors = ({ result }) => {
  const [authorName, setAuthorName] = useState("");
  const [authorBirth, setAuthorBirth] = useState("");

  const [editAuthorBirthday] = useMutation(EDIT_AUTHOR_BIRTHDAY, {
    refetchQueries: [{ query: ALL_PERSONS }],
  });

  let authors = [];

  const handleSetBirthday = () => {
    const integerAuthorBirth = parseInt(authorBirth);
    editAuthorBirthday({
      variables: { name: authorName, setBorn: integerAuthorBirth },
    });

    setAuthorName("");
    setAuthorBirth("");
  };

  if (result.loading) {
    return <div>loading...</div>;
  } else {
    authors = result.data.allAuthors;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set Birthday</h3>
      <form action="">
        <div>
          Name:
          <select
            onChange={(e) => setAuthorName(e.target.value)}
            value={authorName}
          >
            {authors.map((author, index) => {
              return (
                <option key={index} value={author.name}>
                  {author.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          Birthday:
          <input
            type="number"
            value={authorBirth}
            onChange={(e) => setAuthorBirth(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleSetBirthday}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Authors;

import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
  query {
    allAuthors {
      born
      name
      id
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        name
        born
        bookCount
      }
      title
      published
      id
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation Mutation(
    $genres: [String]
    $author: String
    $published: Int
    $title: String
  ) {
    addBook(
      genres: $genres
      author: $author
      published: $published
      title: $title
    ) {
      author
      genres
      id
      published
      title
    }
  }
`;

export const EDIT_AUTHOR_BIRTHDAY = gql`
  mutation Mutation($name: String, $setBorn: Int) {
    editAuthor(name: $name, setBorn: $setBorn) {
      name
      born
      bookCount
      id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      value
    }
  }
`;

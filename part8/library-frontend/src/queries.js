import { gql } from "@apollo/client";

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Authors {
    born
    name
    id
    bookCount
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Books {
    title
    published
    id
    genres
    author {
      name
      id
      born
      bookCount
    }
  }
`;

export const ALL_PERSONS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
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

export const RECOMMENDED_BOOKS = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
      published
      title
      author {
        name
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query Query {
    me {
      username
      favoriteGenre
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
      author {
        born
        bookCount
        name
      }
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

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

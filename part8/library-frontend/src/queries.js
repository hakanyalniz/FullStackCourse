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
      author
      genres
      id
      published
      title
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

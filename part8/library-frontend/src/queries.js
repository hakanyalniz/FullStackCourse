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

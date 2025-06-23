const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v4: uuidv4 } = require("uuid");

const Books = require("./models/books-schema.js");
const Authors = require("./models/authors-schema.js");

// authors,
// books,
// addBook: addBookMutation,
// addAuthor,
// editAuthor,
const data = require("./dummy-db.js");

const typeDefs = `
  type Authors {
    name: String
    id: ID!
    born: Int
    bookCount: String
  }

  type Books {
    title: String
    published: Int
    author: Authors!
    id: ID!
    genres: [String]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Books]
    allAuthors(author: String): [Authors]
  }

  type Mutation {
    addBook(
    title: String,
    published: Int,
    author: String,
    genres: [String]): Books

    editAuthor(name: String, setBorn: Int): Authors
  }
`;

const resolvers = {
  Query: {
    bookCount: () => data.authors.length,
    authorCount: () => data.books.length,
    allBooks: (root, args) => {
      let tempBooks = data.books;
      // Get only the books with the argument author given
      if (args.author) {
        tempBooks = tempBooks.filter((book) => book.author === args.author);
      }

      // Go to each book, go to genre one by one and find ones that match. If find, it is truthy, if false it returns undefined, which is falsy
      if (args.genre) {
        tempBooks = tempBooks.filter((book) =>
          book.genres.find((genre) => genre === args.genre)
        );
      }

      return tempBooks;
    },
    allAuthors: (root, args) => {
      if (!args.author) {
        return data.authors;
      }
      return data.authors.filter((author) => author.name === args.author);
    },
  },

  Mutation: {
    addBook: (root, args) => {
      // create the book to add, update the database and return the added book
      const tempBook = { ...args, id: uuidv4() };
      data.addBook(tempBook);

      // If author is not found in the author database, add it
      if (!data.authors.find((author) => author.name === tempBook.author)) {
        data.addAuthor({
          name: tempBook.author,
          born: undefined,
          id: uuidv4(),
          bookCount: 1,
        });
      }
      // return the newly added book
      return tempBook;
    },

    editAuthor: (root, args) => {
      // Map through the authors array, find the correct author by name, change the born field, otherwise let author be
      const updatedAuthors = data.authors.map((author) =>
        author.name === args.name ? { ...author, born: args.setBorn } : author
      );
      data.editAuthor(updatedAuthors);

      return updatedAuthors.filter((author) => author.name === args.name)[0];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

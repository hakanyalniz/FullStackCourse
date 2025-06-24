const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v4: uuidv4 } = require("uuid");

const { connectMongooseDB, mongoose } = require("./library-backend.js");

const Books = require("./models/books-schema");
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
    bookCount: async () => {
      const result = await Books.find({});
      return result.length;
    },
    authorCount: async () => {
      const result = await Authors.find({});
      return result.length;
    },
    allBooks: async (root, args) => {
      // Get only the books with the argument author given
      let tempBooks = await Books.find({});

      if (args.author) {
        const authorDB = await Authors.findOne({ name: args.author });
        tempBooks = tempBooks.filter(
          (book) => book.author.toString() === authorDB.id
        );
      }

      // Go to each book, go to genre one by one and find ones that match. If find, it is truthy, if false it returns undefined, which is falsy
      if (args.genre) {
        tempBooks = tempBooks.filter((book) =>
          book.genres.find((genre) => genre === args.genre)
        );
      }

      return tempBooks;
    },
    allAuthors: async (root, args) => {
      if (!args.author) {
        return Authors.find({});
      }
      return data.authors.filter((author) => author.name === args.author);
    },
  },

  Books: {
    author: async (root, args) => {
      return Authors.findOne({ _id: root.author });
    },
  },
  // There is a bug where you need to do two mutation queries to add books

  Mutation: {
    addBook: async (root, args) => {
      // create the book to add, update the database and return the added book
      const tempBook = { ...args };
      const authorDoc = await Authors.findOne({ name: tempBook.author });

      // // If author is not found in the author database, add it
      let newAuthor;
      if (!authorDoc) {
        console.log("inside if");

        newAuthor = new Authors({
          name: tempBook.author,
          born: undefined,
          bookCount: 1,
        });
        console.log(newAuthor);

        await newAuthor.save();
      }
      const books = new Books({
        ...tempBook,
        author: authorDoc._id || newAuthor._id,
      });

      return books.save();
    },

    editAuthor: async (root, args) => {
      // Map through the authors array, find the correct author by name, change the born field, otherwise let author be
      const updatedAuthors = data.authors.map((author) =>
        author.name === args.name ? { ...author, born: args.setBorn } : author
      );
      data.editAuthor(updatedAuthors);

      return updatedAuthors.filter((author) => author.name === args.name)[0];
    },
  },
};

async function startApolloServer() {
  await connectMongooseDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}

startApolloServer();

// Wasted 2 hours bug hunting, turns out different Node servers can't communicate properly,
// so Mongoose instances were different and statements like Authors.find() did not work

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { connectMongooseDB } = require("./library-backend.js");

const Books = require("./models/books-schema");
const Authors = require("./models/authors-schema.js");
const Users = require("./models/users-schema.js");

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Books]
    allAuthors(author: String): [Authors]
    me: User
  }

  type Mutation {
    addBook(
      title: String,
      published: Int,
      author: String,
      genres: [String]
    ): Books

    editAuthor(name: String, setBorn: Int): Authors

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
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

        try {
          tempBooks = tempBooks.filter(
            (book) => book.author.toString() === authorDB.id
          );
        } catch (error) {
          throw new GraphQLError("Could not find the author.", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
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
      const result = await Authors.find({});

      if (!args.author) {
        return result;
      }

      // Throw error if author argument is too short
      if (args.author.length < 3) {
        throw new GraphQLError("Author name too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
          },
        });
      }

      return result.filter((author) => author.name === args.author);
    },

    me: async (root, args, context) => {
      console.log(context);

      return context.currentUser;
    },
  },

  Books: {
    author: async (root, args) => {
      return Authors.findOne({ _id: root.author });
    },
  },
  // There is a bug where you need to do two mutation queries to add books

  Mutation: {
    addBook: async (root, args, context) => {
      // check login token
      if (!context.currentUser) {
        throw new GraphQLError("Not logged in", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
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

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not logged in", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      // find the author by name, update the born field and return the updated document
      const updatedAuthors = await Authors.findOneAndUpdate(
        { name: args.name },
        { $set: { born: args.setBorn } },
        { new: true }
      );

      return updatedAuthors;
    },

    createUser: async (root, args) => {
      const result = await new Users({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      result.save();

      return result;
    },

    login: async (root, args) => {
      // Check if the username/password is right (for now, we skip password)
      // If they are, return a token, which will be used for operations that require a login
      const newUser = await Users.findOne({ username: args.username });

      if (!newUser || args.password !== "sekret") {
        throw new GraphQLError("Username or password not correct", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }

      const userForToken = {
        username: newUser.username,
        id: newUser._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
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
    context: async ({ req, res }) => {
      // Extract the auth header from the request
      const auth = req ? req.headers.authorization : null;

      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        );

        const currentUser = await Users.findById(decodedToken.id);

        return { currentUser };
      }
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}

startApolloServer();

// Wasted 2 hours bug hunting, turns out different Node servers can't communicate properly,
// so Mongoose instances were different and statements like Authors.find() did not work

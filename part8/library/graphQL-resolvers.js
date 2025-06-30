const { GraphQLError } = require("graphql");
const Books = require("./models/books-schema");
const Authors = require("./models/authors-schema.js");
const Users = require("./models/users-schema.js");
const jwt = require("jsonwebtoken");

// for subscribe
// PubSub is publish and subscribe
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
        console.log(args.genre);

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
      let authorDoc = await Authors.findOne({ name: tempBook.author });

      // // If author is not found in the author database, add it
      if (!authorDoc) {
        authorDoc = new Authors({
          name: tempBook.author,
          born: undefined,
          bookCount: 1,
        });

        await authorDoc.save();
      } else {
        // This seems to work in increasing bookcount by one, but I suspect it might sometimes increase it more then 1
        authorDoc.bookCount += 1;
        await authorDoc.save();
      }

      const books = new Books({
        ...tempBook,
        author: authorDoc._id,
      });

      // Under the title BOOK_ADDED, publish these changes { bookAdded: books }
      // Now, anyone listening into BOOK_ADDED, will get these changes
      pubsub.publish("BOOK_ADDED", { bookAdded: books });

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

  Subscription: {
    bookAdded: {
      // Anyone that sends a request to this query gets subscribed to BOOK_ADDED
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;

// Spent hours trying to find a bug with pubsub library, seems the problem was the incorrect use of asyncIterator, which was wrongly used in the official doc

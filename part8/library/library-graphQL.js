const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const typeDefs = require("./graphQL-schemas.js");
const resolvers = require("./graphQL-resolvers.js");

const { connectMongooseDB } = require("./library-backend.js");

const Users = require("./models/users-schema.js");

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

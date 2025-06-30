const { ApolloServer } = require("@apollo/server");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const typeDefs = require("./graphQL-schemas.js");
const resolvers = require("./graphQL-resolvers.js");

// For mongoose
const { connectMongooseDB } = require("./library-backend.js");
const Users = require("./models/users-schema.js");

// Express and GraphQL Subscribe stuff
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const http = require("http");

// Websocket libraries to make the subscription run
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

async function startServer() {
  await connectMongooseDB();

  // Setting up express, then http server around it
  const app = express();
  const httpServer = http.createServer(app);

  // The websocket server that will be built on top of express/httpServer server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  // The schema part of the ApolloServer was written seperately here for sake of readability
  // serverCleanup, first the useServer executes a websocket server from the schema and wsServer we created
  // it also works as cleanup, so the requests that are already being sent can be processed before it closes
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  // Changed the way ApolloServer is written by dividing it into schema and plugins objects, so we can make use of plugins
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  // Previously used startStandaloneServer, which was simple to set up but lacked utility
  // this prevented us from using subscribe with it
  // Now, we are setting the GraphQL server on top of express server
  // The context that was listed is here too
  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          const currentUser = await Users.findById(decodedToken.id).populate(
            "friends"
          );
          return { currentUser };
        }
      },
    })
  );

  // the port and listen are listed seperately here
  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
}

startServer();

// Wasted 2 hours bug hunting, turns out different Node servers can't communicate properly,
// so Mongoose instances were different and statements like Authors.find() did not work

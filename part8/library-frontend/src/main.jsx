import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Libraries for graphQL express and subscription
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const authLink = setContext((_, { headers }) => {
  const tokenData = JSON.parse(localStorage.getItem("library-user-token"));

  return {
    headers: {
      ...headers,
      authorization: tokenData ? `Bearer ${tokenData.token}` : null,
    },
  };
});

// Create link for http requests
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

// Create link for websocket for subscription
const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000" }));

// Split allows us to seperate ordinary http requests and websocket requests
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

// The link way of adding the URI allows us to more specifically deal with sending whatever we want
// Therefore we can send the headers we want
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>
);

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Home from "./components/Home";
import Login from "./components/Login";
import Recommendation from "./components/Recommendation";

import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import { ALL_PERSONS, ALL_BOOKS, BOOK_ADDED } from "./queries";

import "./style.css";

const App = () => {
  const [token, setToken] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const allPersonResult = useQuery(ALL_PERSONS);
  const allBooksResult = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBook = data.data.bookAdded;
      window.alert(`New book added: ${newBook.title}`);

      // Manually update the cache
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        // Check if the book is already in the cache
        if (allBooks.find((book) => book.id === newBook.id)) {
          return { allBooks }; // If it exists, return the original array
        }
        return {
          allBooks: allBooks.concat(newBook),
        };
      });
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  // Check the local storage to see if token is available and if it expired

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("library-user-token"));
    const now = new Date();

    if (tokenData) {
      if (now.getTime() > tokenData.expiry) {
        localStorage.removeItem("library-user-token"); // Remove expired token
        setToken(null);
      }
      // if it didn't expire assign the token to state
      setToken(tokenData.token);
    }
  }, []);

  return (
    <div>
      <nav className="navigation">
        <Link to={"/authors"}>Authors</Link>
        <Link to={"/books"}>Books</Link>
        <Link to={"/newbook"}>Add Book</Link>
        <Link to={"/recommendation "}>Recommendation</Link>

        {token ? (
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </nav>

      <main className="container">
        {/* If notifMessage exists, render the div which contains the message or render null */}
        {notificationMessage ? (
          <div className="notification-message">{notificationMessage}</div>
        ) : null}

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/authors"
            element={<Authors result={allPersonResult} />}
          />
          <Route path="/books" element={<Books result={allBooksResult} />} />
          <Route
            path="/newbook"
            element={token ? <NewBook /> : <Navigate to="/login" />}
          />
          <Route
            path="/recommendation"
            element={token ? <Recommendation /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              <Login
                setToken={setToken}
                setNotification={setNotificationMessage}
              />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

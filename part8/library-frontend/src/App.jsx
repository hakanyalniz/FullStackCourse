import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Home from "./components/Home";
import Login from "./components/Login";

import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_PERSONS, ALL_BOOKS } from "./queries";

import "./style.css";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const allPersonResult = useQuery(ALL_PERSONS);
  const allBooksResult = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  useEffect(() => {
    console.log(token);
  });

  return (
    <div>
      <nav className="navigation">
        <Link to={"/authors"}>Authors</Link>
        <Link to={"/books"}>Books</Link>
        <Link to={"/newbook"}>Add Book</Link>
        {token ? (
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </nav>

      <main className="container">
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
            path="/login"
            element={<Login setToken={setToken} setError={setErrorMessage} />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

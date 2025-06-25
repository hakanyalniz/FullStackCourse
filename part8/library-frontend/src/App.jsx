import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Home from "./components/Home";
import Login from "./components/Login";

import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ALL_PERSONS, ALL_BOOKS } from "./queries";

import "./style.css";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const allPersonResult = useQuery(ALL_PERSONS);
  const allBooksResult = useQuery(ALL_BOOKS);

  return (
    <div>
      <nav className="navigation">
        <Link to={"/authors"}>authors</Link>
        <Link to={"/books"}>books</Link>
        <Link to={"/newbook"}>add book</Link>
        <Link to={"/login"}>login</Link>
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

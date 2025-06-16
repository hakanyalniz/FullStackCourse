import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { Routes, Route, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ALL_PERSONS, ALL_BOOKS } from "./queries";

import "./style.css";

const App = () => {
  const allPersonResult = useQuery(ALL_PERSONS);
  const allBooksResult = useQuery(ALL_BOOKS);

  return (
    <div>
      <nav className="navigation">
        <Link to={"/authors"}>authors</Link>
        <Link to={"/books"}>books</Link>
        <Link to={"/newbook"}>add book</Link>
      </nav>

      <main className="container">
        <Routes>
          <Route
            path="/authors"
            element={<Authors result={allPersonResult} />}
          />
          <Route path="/books" element={<Books result={allBooksResult} />} />
          <Route path="/newbook" element={<NewBook />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

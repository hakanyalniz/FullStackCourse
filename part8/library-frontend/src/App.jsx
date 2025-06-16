import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { Routes, Route, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ALL_PERSONS } from "./queries";

import "./style.css";

const App = () => {
  const result = useQuery(ALL_PERSONS);

  return (
    <div>
      <nav className="navigation">
        <Link to={"/authors"}>authors</Link>
        <Link to={"/books"}>books</Link>
        <Link to={"/newbook"}>add book</Link>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/authors" element={<Authors result={result} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/newbook" element={<NewBook />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

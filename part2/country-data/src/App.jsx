import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";

function App() {
  const [searchIndex, setSearchIndex] = useState("");

  return (
    <div>
      <SearchBar
        searchIndex={searchIndex}
        setSearchIndex={setSearchIndex}
        className="searchBarApp"
      />
      {searchIndex}
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsa
        neque beatae in consequuntur a minus incidunt sint. Assumenda voluptates
        aspernatur pariatur accusantium nam at voluptatem accusamus delectus
        nostrum magnam.
      </div>
    </div>
  );
}

export default App;

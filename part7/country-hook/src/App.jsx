import React, { useState, useEffect } from "react";
import axios from "axios";
import { useField, useCountry } from "./hooks";

import Country from "./Country";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);
  console.log(country);

  const fetch = (e) => {
    e.preventDefault();
    console.log("fetch");

    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;

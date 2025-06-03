import { useState, useEffect } from "react";
import axios from "axios";

const baseNameURL = "https://studies.cs.helsinki.fi/restcountries/api/name";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  // use async inside useEffect for fetching
  useEffect(() => {
    async function fetchData() {
      const response = await axios
        .get(`${baseNameURL}/${name}`)
        .catch(function (error) {
          console.log(error);
        });
      setCountry(response.data);
    }

    // Use fetchData seperately because we are inside useEffect
    fetchData();
  }, [name]);
  // If country is available, then found is true, if not, then it is not found, therefore it is false
  return { data: country, found: country ? true : false };
};

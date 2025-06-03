import { useState, useEffect } from "react";
import axios from "axios";

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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl);
        setResources(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (baseUrl) {
      fetchData(); // Trigger the fetch
    }
  }, [baseUrl]); // Re-run the effect if `baseUrl` changes

  const create = (resource) => {
    axios.post(baseUrl, resource);
  };

  const service = {
    create,
  };

  return [resources, service];
};

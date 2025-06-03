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

  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl);
      setResources(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (baseUrl) {
      fetchData(); // Trigger the fetch
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]); // Re-run the effect if `baseUrl` changes

  const create = async (resource) => {
    await axios.post(baseUrl, resource);
    // Do a new fetch if something is created, so component can re render
    fetchData();
  };

  const service = {
    create,
  };

  return [resources, service];
};

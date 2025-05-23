import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data.map(asObject);
};

const asObject = (anecdote) => {
  return {
    ...anecdote,
    votes: 0,
  };
};

export default { getAll };

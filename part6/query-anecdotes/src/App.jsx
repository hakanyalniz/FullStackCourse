import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const anecdoteResult = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () =>
      axios.get("http://localhost:3001/anecdotes").then((res) => res.data),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  console.log(JSON.parse(JSON.stringify(anecdoteResult)));

  if (anecdoteResult.status === "error") {
    return (
      <div>
        <span>An error occured with the server.</span>
      </div>
    );
  } else if (anecdoteResult.status !== "success") {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdoteResult.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

import { useContext } from "react";
import CounterContext from "./store/CounterContext";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotes, voteAnecdote } from "./services/requests";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const [notification, dispatch] = useContext(CounterContext);

  const queryClient = useQueryClient();

  // Updated the mutation so that instead of doing a put and get to update the state
  // we instead update the local state manually
  const newAnecdoteVoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id === votedAnecdote.id ? { ...votedAnecdote } : anecdote
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    newAnecdoteVoteMutation.mutate(anecdote);
    dispatch({ type: "NEW", payload: `Voted for "${anecdote.content}".` });
  };

  const anecdoteResult = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getNotes,
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
  } else if (anecdoteResult.status === "success") {
    console.log("anecdoteResult,data", anecdoteResult.data);
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

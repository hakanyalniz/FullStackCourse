import { useContext } from "react";
import CounterContext from "../store/CounterContext";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/requests";

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(CounterContext);

  const queryClient = useQueryClient();

  // if successful, invalidates anecdotes queries, which causes it to call the query function
  // which fetches data again from the server
  // this basically allows us to fetch data from server whenever server has changes
  // !!!UPDATE!!!
  //  The above was how it happened before, now we just change the state locally instead of fetching
  // from server again
  const newAnecddoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);

      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecddoteMutation.mutate({ content, votes: 0 });
    dispatch({
      type: "NEW",
      payload: `Created new anecdote named "${content}".`,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

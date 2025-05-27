import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotes, createAnecdote } from "../services/requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  // if successful, invalidates anecdotes queries, which causes it to call the query function
  // which fetches data again from the server
  // this basically allows us to fetch data from server whenever server has changes
  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newNoteMutation.mutate({ content, votes: 0 });
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

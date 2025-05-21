const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE":
      // find the correct id, increase its vote by 1, for the rest, keep them as is
      // lastly, sort them from big to small
      return state
        .map((element) =>
          element.id === action.payload.id
            ? { ...element, votes: element.votes + 1 }
            : element
        )
        .sort((a, b) => b.votes - a.votes);
    case "ADD_ANECDOTE":
      return [...state, asObject(action.payload.content)];
    default:
      return state;
  }
};

export const createAction = (type, payload) => {
  return { type: type, payload: payload };
};

export default anecdoteReducer;

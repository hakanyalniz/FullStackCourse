const initialState = "";

const anecdoteFilterReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const createAction = (type, payload) => {
  return { type: type, payload: payload.filter };
};

export default anecdoteFilterReducer;

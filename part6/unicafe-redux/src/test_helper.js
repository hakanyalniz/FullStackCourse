import counterReducer from "./reducer";
import deepFreeze from "deep-freeze";

function setAction(type, initialState) {
  const action = {
    type: type,
  };
  const state = initialState;

  deepFreeze(state);
  const newState = counterReducer(state, action);

  return newState;
}

export { setAction };

/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useReducer } from "react";

// Either set new notification message or reset it
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW":
      return action.payload;
    case "ZERO":
      return "";
    default:
      return state;
  }
};

const CounterContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <CounterContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContext;

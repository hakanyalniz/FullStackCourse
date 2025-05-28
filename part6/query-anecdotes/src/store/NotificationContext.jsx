/* eslint-disable react/prop-types */
import { useContext } from "react";

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

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationReducerNotification = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  return notification;
};

export const useNotificationReducerDispatch = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  return dispatch;
};

export default NotificationContext;

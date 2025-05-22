import { useSelector, useDispatch } from "react-redux";
import { changeNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    // if there is a notification message in the store state, change display
    display: notification === "" ? "none" : "block",
  };

  // After 5 seconds change notification to empty string, which will change display to none above
  setTimeout(() => {
    dispatch(changeNotification(""));
  }, 5000);

  return <div style={style}>{notification}</div>;
};

export default Notification;

import { useContext } from "react";
import NotificationContext from "../store/NotificationContext";

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (notification === "") return null;

  // If notification is not empty, not only render what is below but also, 5 seconds later
  // reset it, which will make it dissappear
  if (notification) {
    setTimeout(() => {
      dispatch({ type: "ZERO" });
    }, 5000);
  }

  return (
    <div style={style}>
      <span>{notification}</span>
    </div>
  );
};

export default Notification;

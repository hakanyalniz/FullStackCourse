import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    // if there is a notification message in the store state, change display
    display: notification === "" ? "none" : "block",
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;

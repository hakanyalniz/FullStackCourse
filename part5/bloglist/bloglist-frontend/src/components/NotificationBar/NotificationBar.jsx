import { useEffect, useState } from "react";

const NotificationBar = ({ message = "" }) => {
  const [notificationMessage, setNotificationMessage] = useState("");

  // Each time a message is sent, display it for 5 seconds then reset
  useEffect(() => {
    setNotificationMessage(message);

    setTimeout(() => {
      setNotificationMessage("");
    }, 5000);
  }, []);

  return notificationMessage === "" ? <div>{message}</div> : <></>;
};

export default NotificationBar;

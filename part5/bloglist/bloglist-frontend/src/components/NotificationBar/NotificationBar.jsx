import { useEffect, useState } from "react";

const NotificationBar = ({ notificationMessage, setNotificationMessage }) => {
  // Each time a message is sent, display it for 5 seconds then reset
  useEffect(() => {
    setTimeout(() => {
      setNotificationMessage("");
    }, 5000);
  }, []);

  return notificationMessage === "" ? <></> : <div>{notificationMessage}</div>;
};

export default NotificationBar;

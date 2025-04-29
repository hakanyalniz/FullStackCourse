import { useEffect, useState } from "react";
import "./style.css";

const NotificationBar = ({ notificationMessage, setNotificationMessage }) => {
  // Each time a message is sent, display it for 5 seconds then reset
  useEffect(() => {
    const notificationElement = document.getElementById("notification-bar");

    console.log(notificationElement);
    if (notificationElement === null) return;
    if (notificationMessage.status === true) {
      notificationElement.classList.remove("failure");
      notificationElement.classList.add("success");
    } else if (notificationMessage.status === false) {
      notificationElement.classList.remove("success");
      notificationElement.classList.add("failure");
    }

    setTimeout(() => {
      setNotificationMessage({ message: "", status: undefined });
    }, 5000);
    console.log(notificationMessage);
  }, [notificationMessage]);

  return notificationMessage.message === "" ? (
    <></>
  ) : (
    <div id="notification-bar">{notificationMessage.message}</div>
  );
};

export default NotificationBar;

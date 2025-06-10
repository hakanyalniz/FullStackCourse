import { useEffect } from "react";
import "./style.css";

import { useSelector } from "react-redux";
// { notificationMessage, setNotificationMessage }
const NotificationBar = () => {
  const notificationMessage = useSelector((state) => state.notification);

  // Each time a message is sent, display it for 5 seconds then reset
  useEffect(() => {
    const notificationElement = document.getElementById("notification-bar");

    if (notificationElement === null) return;
    if (notificationMessage.status === true) {
      notificationElement.classList.remove("failure");
      notificationElement.classList.add("success");
    } else if (notificationMessage.status === false) {
      notificationElement.classList.remove("success");
      notificationElement.classList.add("failure");
    }

    console.log(notificationMessage);
  }, [notificationMessage]);

  return notificationMessage.message === "" ? (
    <></>
  ) : (
    <div
      id="notification-bar"
      className="p-2.5! border-5 border-black rounded-lg bg-gray-400 text-2xl font-semibold text-black"
    >
      {notificationMessage.message}
    </div>
  );
};

export default NotificationBar;

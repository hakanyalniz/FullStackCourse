import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import NotificationBar from "./components/NotificationBar/NotificationBar";
import Blogs from "./components/Blogs/Blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });
  const [notificationMessage, setNotificationMessage] = useState({
    message: "",
    status: true,
  });

  // Reset everything to log out
  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    setLoginUser({
      username: "",
      password: "",
    });
  };

  const handleNotificationMessage = (message, status) => {
    setNotificationMessage({ message: message, status: status });
  };

  // When first accessing the website, check if user is logged in by looking at local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(user);
    }
  }, []);

  // Check if username is available for user, if not then request login
  // otherwise display blog
  return user === null ? (
    <>
      <NotificationBar
        notificationMessage={notificationMessage}
        setNotificationMessage={setNotificationMessage}
      />
      <Login
        loginUser={loginUser}
        setLoginUser={setLoginUser}
        setUser={setUser}
        handleNotificationMessage={handleNotificationMessage}
      />
    </>
  ) : (
    <div>
      <NotificationBar
        notificationMessage={notificationMessage}
        setNotificationMessage={setNotificationMessage}
      />

      <h2>User</h2>
      <div>Logged in as {user.name}</div>
      <button onClick={handleLogOut}>Logout</button>

      <Blogs
        user={user}
        handleNotificationMessage={handleNotificationMessage}
      />
    </div>
  );
};

export default App;

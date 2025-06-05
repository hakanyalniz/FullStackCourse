import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import NotificationBar from "./components/NotificationBar/NotificationBar";
import Blogs from "./components/Blogs/Blogs";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });

  // Reset everything to log out
  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(setUser(null));
    setLoginUser({
      username: "",
      password: "",
    });
  };

  const handleNotificationMessage = (message, status) => {
    dispatch(setNotification(message, status, 5));
  };

  // When first accessing the website, check if user is logged in by looking at local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      console.log(user);
    }
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  // Check if username is available for user, if not then request login
  // otherwise display blog
  return user === null ? (
    <>
      <NotificationBar />
      <Login
        loginUser={loginUser}
        setLoginUser={setLoginUser}
        handleNotificationMessage={handleNotificationMessage}
      />
    </>
  ) : (
    <div>
      <NotificationBar />

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

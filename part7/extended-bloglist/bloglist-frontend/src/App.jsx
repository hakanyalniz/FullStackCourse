import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import NotificationBar from "./components/NotificationBar/NotificationBar";
import Blogs from "./components/Blogs/Blogs";
import Blog from "./components/Blog/Blog";
import Users from "./components/Users/Users";
import User from "./components/User/User";
import Navigation from "./components/Navigation/Navigation";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setUser } from "./reducers/userReducer";

import { Routes, Route } from "react-router-dom";

import "./main.css";

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
    console.log(user);

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

  return (
    <div>
      <Navigation />
      <NotificationBar />
      {console.log("user", user)}

      {user ? (
        <>
          <h2>User</h2>
          <div>Logged in as {user.name}</div>
          <button onClick={handleLogOut}>Logout</button>
        </>
      ) : null}

      <Routes>
        {/* The routes were done in a way so that if user is not defined properly, you would need to login */}
        <Route path="/users" element={<Users />} />

        <Route
          path="/login"
          element={
            user ? (
              <div>
                <h1>You are already logged in.</h1>
              </div>
            ) : (
              <Login
                loginUser={loginUser}
                setLoginUser={setLoginUser}
                handleNotificationMessage={handleNotificationMessage}
              />
            )
          }
        />

        <Route
          path="/"
          element={
            user ? (
              <Blogs
                user={user}
                handleNotificationMessage={handleNotificationMessage}
              />
            ) : (
              <Login
                loginUser={loginUser}
                setLoginUser={setLoginUser}
                handleNotificationMessage={handleNotificationMessage}
              />
            )
          }
        />

        <Route path="/User/:userID" element={<User />} />

        <Route path="/Blogs/:blogID" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;

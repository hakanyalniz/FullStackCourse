import { useState, useEffect } from "react";
import Blog from "./components/Blog/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login/Login";
import CreateBlog from "./components/CreateBlog/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
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

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

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
    <Login
      loginUser={loginUser}
      setLoginUser={setLoginUser}
      setUser={setUser}
    />
  ) : (
    <div>
      <h2>User</h2>
      <div>Logged in as {user.name}</div>
      <button onClick={handleLogOut}>Logout</button>

      <h2>Create Blog</h2>
      <CreateBlog user={user} setBlogs={setBlogs} />

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

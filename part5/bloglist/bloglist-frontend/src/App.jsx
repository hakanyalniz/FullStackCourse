import { useState, useEffect } from "react";
import Blog from "./components/Blog/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      <h2>blogs</h2>
      <div>Logged in as {user.name}</div>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

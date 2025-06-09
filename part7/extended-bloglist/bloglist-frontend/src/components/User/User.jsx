import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usersService from "../../services/users";
import blogService from "../../services/blogs";

const User = () => {
  // userID matches the :productId in your Route path
  const { userID } = useParams();
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    async function fetchUser() {
      setUser(await usersService.getOneUsers(userID));
      setBlogs(await blogService.getAll());
    }
    fetchUser();
  }, [userID]);

  return !user ? (
    <div>
      <h1>404 - User not found</h1>
    </div>
  ) : (
    <div>
      <h1>{user.name}</h1>
      <h2>Added Blogs</h2>
      <div>
        <ul>
          {/* The blog state has all the blogs, filter it by user id so only those belonging to it are left
            then map through it and list them. If blogs is yet to be available, show a loading text first. */}
          {blogs
            ? blogs
                .filter((blog) => blog.user.id === user.id)
                .map((blog, index) => <li key={index}>{blog.title}</li>)
            : "Loading"}
        </ul>
      </div>
    </div>
  );
};

export default User;

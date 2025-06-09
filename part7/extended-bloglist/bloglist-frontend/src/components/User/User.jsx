import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usersService from "../../services/users";

const User = () => {
  // userID matches the :productId in your Route path
  const { userID } = useParams();
  let [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      setUser(await usersService.getOneUsers(userID));
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
          {user.blogs.map((blog) => {
            return <li key={blog}>{blog}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default User;

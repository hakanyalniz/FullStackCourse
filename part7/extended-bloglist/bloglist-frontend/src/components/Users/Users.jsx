import { useDispatch, useSelector } from "react-redux";
import { setThunkAllUsers } from "../../reducers/usersReducer";
import { useEffect } from "react";

import { Link } from "react-router-dom";

import "./style.css";

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(setThunkAllUsers());
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Created Blog Number</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/User/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

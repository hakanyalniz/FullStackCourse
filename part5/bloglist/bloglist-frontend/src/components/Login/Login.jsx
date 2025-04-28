import loginService from "../../services/login";
import { useState, useEffect } from "react";

const Login = ({ loginUser, setLoginUser, setUser }) => {
  const handleLogin = async (event) => {
    event.preventDefault();

    console.log("logging in with", loginUser.username, loginUser.password);
    console.log("log", loginUser);

    try {
      const user = await loginService.login({
        username: loginUser.username,
        password: loginUser.password,
      });
      setUser(user);
      setLoginUser({
        username: "",
        password: "",
      });
    } catch (exception) {
      console.log("Wrong credentials", exception);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <span>username:</span>
          <input
            type="text"
            value={loginUser.username}
            name="Username"
            onChange={({ target }) =>
              setLoginUser({ ...loginUser, username: target.value })
            }
            placeholder="Enter Username"
            required
          />
        </div>
        <div>
          <span>password:</span>
          <input
            type="password"
            value={loginUser.password}
            name="Password"
            onChange={({ target }) =>
              setLoginUser({ ...loginUser, password: target.value })
            }
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

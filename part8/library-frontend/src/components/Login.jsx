import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../queries";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, result] = useMutation(LOGIN_USER, {
    onError: (error) => {
      console.log(error);
      setNotification(error.graphQLErrors[0].message);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);

      const now = new Date();
      const expiry = now.getTime() + 60 * 60 * 1000; // 1 hour

      const tokenData = {
        token: token,
        expiry: expiry,
      };

      localStorage.setItem("library-user-token", JSON.stringify(tokenData));
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

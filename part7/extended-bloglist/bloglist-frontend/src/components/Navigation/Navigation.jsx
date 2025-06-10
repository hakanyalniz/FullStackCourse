import "./style.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <ul className="navigation-container">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/users"}>
          <li>Users</li>
        </Link>
        <Link to={"/login"}>Login</Link>
        <li></li>
      </ul>
    </div>
  );
};

export default Navigation;

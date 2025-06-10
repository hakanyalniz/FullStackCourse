import "./style.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <ul className="flex flex-row items-center gap-2.5 bg-gray-500 p-2! rounded-lg ">
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

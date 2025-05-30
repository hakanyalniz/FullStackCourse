import { Link } from "react-router-dom";
import Notification from "./Notification";

const Menu = ({ notification }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <div>
        <Link to="/" style={padding}>
          anecdotes
        </Link>
        <Link to="/create-new" style={padding}>
          create new
        </Link>
        <Link to="/about" style={padding}>
          about
        </Link>
      </div>

      <Notification notification={notification} />
    </div>
  );
};

export default Menu;

import { useParams } from "react-router-dom";

const User = () => {
  // userID matches the :productId in your Route path
  const { userID } = useParams();

  return <div>{userID}</div>;
};

export default User;

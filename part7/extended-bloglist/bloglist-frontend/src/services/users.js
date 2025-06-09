import axios from "axios";

const baseUrl = "/api/users";

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOneUsers = async (userID) => {
  const response = await axios.get(`${baseUrl}/${userID}`);
  return response.data;
};

export default { getAllUsers, getOneUsers };

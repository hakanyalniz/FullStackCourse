import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postBlog = async (requestBody, userToken) => {
  const config = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  const response = await axios.post(baseUrl, requestBody, config);
  return response.data;
};

export default { getAll, postBlog };

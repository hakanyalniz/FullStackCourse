// Frontend uses these services to connect with backend, which will use their own services to manipulate the database

import loginService from "../services/login";
import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postBlog = async (requestBody, userToken) => {
  const config = {
    headers: { Authorization: loginService.setToken(userToken) },
  };

  const response = await axios.post(baseUrl, requestBody, config);
  return response.data;
};

const updateBlog = async (requestBody) => {
  console.log(requestBody);

  const response = await axios.put(`/api/blogs/${requestBody.id}`, requestBody);
  console.log("response", response);
  return response;
};

// requestBody contains a blog id and a message to be sent
const postMessageToBlog = async (requestBody) => {
  console.log(requestBody);

  const response = await axios.put(
    `/api/blogs/${requestBody.id}/comments`,
    requestBody
  );

  return response;
};

const deleteBlog = async (requestBody, userToken) => {
  const config = {
    headers: { Authorization: loginService.setToken(userToken) },
  };

  const response = await axios.delete(`/api/blogs/${requestBody.id}`, config);
  console.log("response", response);
  return response;
};

export default { getAll, postBlog, updateBlog, deleteBlog, postMessageToBlog };

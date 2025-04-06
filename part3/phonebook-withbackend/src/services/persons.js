import axios from "axios";

const baseURL = "api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const addPerson = (payload) => {
  console.log(payload);
  const request = axios.post(baseURL, payload);
  return request.then((response) => response.data);
};

const deletePerson = (personID) => {
  const deleteResource = `${baseURL}/` + personID;
  const request = axios.delete(deleteResource);
  return request.then((response) => response.data);
};

const updatePerson = (payload) => {
  const updateResource = `${baseURL}/`;
  const request = axios.put(updateResource, payload);
  return request.then((response) => response.data);
};

export default { getAll, addPerson, deletePerson, updatePerson };

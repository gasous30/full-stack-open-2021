import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (idKey, newObject) => {
  return axios.put(`${baseUrl}/${idKey}`, newObject);
};

const service = { getAll, create, update };

export default service;

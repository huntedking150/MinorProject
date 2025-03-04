import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', //🔥 Yeh Tere Backend Ka URL
  withCredentials: true,
});

export default API;

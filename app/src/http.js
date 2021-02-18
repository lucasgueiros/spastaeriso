import axios from 'axios';

const http = axios.create({
  baseURL: 'https://localhost:8090/api1'
});

export default http;

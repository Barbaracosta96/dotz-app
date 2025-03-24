import axios from 'axios';

const baseURL = 'http://localhost:3001'; // Ajuste para a porta do seu JSON Server

const api = axios.create({
  baseURL: baseURL,
});

export default api;
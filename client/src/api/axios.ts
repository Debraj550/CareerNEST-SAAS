import axios from "axios";

export const userAuthApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const tenantApi = axios.create({
  baseURL: "http://localhost:8080",
});

export default axios;

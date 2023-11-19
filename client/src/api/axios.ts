import axios from "axios";

export const userAuthApi = axios.create({
  baseURL: "http://localhost:80",
});

export const tenantApi = axios.create({
  baseURL: "http://localhost:80",
});

export default axios;

import axios from "axios";

export const userAuthApi = axios.create({
  baseURL: "http://localhost:8000",
});

export const tenantApi = axios.create({
  baseURL: "http://localhost:8001",
});

export default axios;

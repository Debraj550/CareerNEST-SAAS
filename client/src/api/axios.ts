import axios from "axios";

export const employeeOnboardApi = axios.create({
  baseURL: "http://localhost:8002",
});

export const tenantApi = axios.create({
  baseURL: "http://localhost:8001",
});

export default axios;

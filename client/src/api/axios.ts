import axios from "axios";

export const tenantApi = axios.create({
  baseURL: "http://localhost:8001",
});

export const employeeOnboardApi = axios.create({
  baseURL: "http://localhost:8002",
});

export const jobsApi = axios.create({
  baseURL: "http://localhost:8003",
});

export const jobApplicationApi = axios.create({
  baseURL: "http://localhost:8004",
});

export default axios;

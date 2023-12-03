import axios from "axios";

export const tenantApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const employeeOnboardApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const jobsApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const jobApplicationApi = axios.create({
  baseURL: "http://localhost:8080",
});

export default axios;

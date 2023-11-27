import express from "express";
import httpProxy from "http-proxy";
import os from "os";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const proxy = httpProxy.createProxyServer();

const tenantManagement = [
  {
    url: "http://tenant_service:8001",
    instances: [],
  },
];
const employeeOnboard = [
  { url: "http://employee_onboarding_service:8002", instances: [] },
];

const PORT = 8080;
const MAX_INSTANCES = 10;
const REQUEST_THRESHOLD = 2;

let currentTenantIndex = 0;
let currentEmployeeIndex = 0;
let tenantReqCount = 0;
let onboardReqCount = 0;

app.all("/api/onboard/*", (req, res) => {
  onboardReqCount++;
  const target = getNextEmployeeInstance().url;

  proxy.web(req, res, { target });
});

app.all("/api/tenant/*", (req, res) => {
  tenantReqCount++;
  const target = getNextTenantInstance().url;
  proxy.web(req, res, { target });
});

app.listen(PORT, () => {
  console.log(`Master server is running on port ${PORT}`);
  scaleInstances();
  setInterval(checkAndScale, 5000);
});

function getNextTenantInstance() {
  currentTenantIndex = (currentTenantIndex + 1) % tenantManagement.length;
  return tenantManagement[currentTenantIndex];
}

function getNextEmployeeInstance() {
  currentEmployeeIndex = (currentEmployeeIndex + 1) % employeeOnboard.length;
  return employeeOnboard[currentEmployeeIndex];
}

function scaleInstances() {
  for (let i = 0; i < 2; i++) {
    createEmployeeInstance();
    createTenantInstance();
  }
}

function createEmployeeInstance() {
  return new Promise((resolve, reject) => {
    const instancePath = path.join("/usr/src/app", "server.js");
    const instance = spawn("nodemon", [instancePath]);
    const childProcessId = instance.pid;

    instance.on("exit", (code) => {
      const index =
        employeeOnboard[currentEmployeeIndex].instances.indexOf(instance);
      employeeOnboard[currentEmployeeIndex].instances.splice(index, 1);
      console.log(`Employee instance exited with code ${code}`);
    });

    instance.on("error", (err) => {
      console.error(`Error creating employee instance: ${err.message}`);
      reject(err);
    });

    instance.on("close", (code) => {
      console.log(`Employee instance closed with code ${code}`);
      resolve(instance);
    });

    employeeOnboard[currentEmployeeIndex].instances.push({
      instance,
      childProcessId,
    });
  });
}

function createTenantInstance() {
  return new Promise((resolve, reject) => {
    const instancePath = path.join("/usr/src/app", "server.js");
    const instance = spawn("nodemon", [instancePath]);
    const childProcessId = instance.pid;

    instance.on("exit", (code) => {
      const index =
        tenantManagement[currentTenantIndex].instances.indexOf(instance);
      tenantManagement[currentTenantIndex].instances.splice(index, 1);
      console.log(`Tenant instance exited with code ${code}`);
    });

    instance.on("error", (err) => {
      console.error(`Error creating tenant instance: ${err.message}`);
      reject(err);
    });

    instance.on("close", (code) => {
      console.log(`Tenant instance closed with code ${code}`);
      resolve(instance);
    });

    tenantManagement[currentTenantIndex].instances.push({
      instance,
      childProcessId,
    });
  });
}

function checkAndScale() {
  console.log(employeeOnboard);
  console.log(tenantManagement);
  console.log(
    "Number of employee instances currently - ",
    employeeOnboard[currentEmployeeIndex].instances.length
  );

  console.log(
    "Number of tenant instances currently - ",
    tenantManagement[currentTenantIndex].instances.length
  );

  if (
    onboardReqCount > REQUEST_THRESHOLD &&
    employeeOnboard[currentEmployeeIndex].instances.length < MAX_INSTANCES
  ) {
    console.log(
      `Request count is high (${onboardReqCount}), scaling up employee instances...`
    );
    createEmployeeInstance();
    onboardReqCount = 0;
  }
  if (
    tenantReqCount > REQUEST_THRESHOLD &&
    tenantManagement[currentTenantIndex].instances.length < MAX_INSTANCES
  ) {
    console.log(
      `Request count is high (${tenantReqCount}), scaling up tenant instances...`
    );
    createTenantInstance();
    tenantReqCount = 0;
  } else {
    console.log(`Onboard Request count is normal (${onboardReqCount})`);
    console.log(`Tenant Request count is normal (${tenantReqCount})`);
  }
}

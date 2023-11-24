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

const employeeOnboard = [
  { url: "http://localhost:8002", instances: [] },
  {
    url: "http://localhost:8001",
    instances: [],
  },
];

const PORT = 8080;
const MAX_INSTANCES = 5;
const REQUEST_THRESHOLD = 5;

let currentIndex = 0;
let requestCount = 0;

app.use((req, res, next) => {
  requestCount += 1;
  next();
});

app.all("/api/onboard/*", (req, res) => {
  const target = employeeOnboard[currentIndex].url;
  proxy.web(req, res, { target });
});

app.listen(PORT, () => {
  console.log(`Master server is running on port ${PORT}`);
  scaleInstances();
  setInterval(checkAndScale, 5000); // Check and scale every 5 seconds
});

function scaleInstances() {
  for (let i = 0; i < 2; i++) {
    createInstance();
  }
}

function createInstance() {
  const instancePath = path.join(
    __dirname,
    "../Employee_Onboarding_Service",
    "server.js"
  );
  const instance = spawn("node", [instancePath]);
  employeeOnboard[currentIndex].instances.push(instance);

  instance.on("exit", (code) => {
    const index = employeeOnboard[currentIndex].instances.indexOf(instance);
    employeeOnboard[currentIndex].instances.splice(index, 1);
  });
}

function checkAndScale() {
  console.log(
    "Number of instances currently - ",
    employeeOnboard[currentIndex].instances.length
  );
  if (
    requestCount > REQUEST_THRESHOLD &&
    employeeOnboard[currentIndex].instances.length < MAX_INSTANCES
  ) {
    console.log(`Request count is high (${requestCount}), scaling up...`);
    createInstance();
    requestCount = 0;
  } else {
    console.log(`Request count is normal (${requestCount})`);
  }
}

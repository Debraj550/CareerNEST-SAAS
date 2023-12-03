import express from "express";
import httpProxy from "http-proxy";
import { exec } from "child_process";
import tenantManagement from "./configs/tenantManagement.js";
import employeeOnboard from "./configs/employeeOnboard.js";
import jobPosts from "./configs/jobPosts.js";
import jobApplication from "./configs/jobApplication.js";

const app = express();
const proxy = httpProxy.createProxyServer();

const PORT = 8080;
const MAX_REPLICAS = 10;
const REQUEST_THRESHOLD = 2;

let currentTenantIndex = 0;
let currentEmployeeIndex = 0;
let currentJobPostIndex = 0;
let currentJobApplicationIndex = 0;

////////////////////////////////////////////////////////

app.all("/api/onboard/*", (req, res) => {
  employeeOnboard[currentEmployeeIndex].requestCount++;
  const target = getNextEmployeeInstance().url;
  proxy.web(req, res, { target });
});

app.all("/api/tenant/*", (req, res) => {
  tenantManagement[currentTenantIndex].requestCount++;
  const target = getNextTenantInstance().url;
  proxy.web(req, res, { target });
});

app.all("/api/job-post-service/*", (req, res) => {
  jobPosts[currentJobPostIndex].requestCount++;
  const target = getNextJobPostInstance().url;
  proxy.web(req, res, { target });
});

app.all("/api/job-applications/*", (req, res) => {
  jobApplication[currentJobApplicationIndex].requestCount++;
  const target = getNextJobApplicationInstance().url;
  proxy.web(req, res, { target });
});

app.listen(PORT, () => {
  console.log(`Master server is running on port ${PORT}`);
  scaleInstances();
  setInterval(checkAndScale, 5000);
});

//////////////////////////////////////////////////////////

function getNextTenantInstance() {
  currentTenantIndex = (currentTenantIndex + 1) % tenantManagement.length;
  return tenantManagement[currentTenantIndex];
}

function getNextEmployeeInstance() {
  currentEmployeeIndex = (currentEmployeeIndex + 1) % employeeOnboard.length;
  return employeeOnboard[currentEmployeeIndex];
}

function getNextJobPostInstance() {
  currentJobPostIndex = (currentJobPostIndex + 1) % jobPosts.length;
  return jobPosts[currentJobPostIndex];
}

function getNextJobApplicationInstance() {
  currentJobApplicationIndex =
    (currentJobApplicationIndex + 1) % jobApplication.length;
  return jobApplication[currentJobApplicationIndex];
}

////////////////////////////////////////////////////////
async function scaleInstances() {
  for (let i = 0; i < 2; i++) {
    scaleService(employeeOnboard[currentEmployeeIndex]);
    scaleService(tenantManagement[currentTenantIndex]);
    scaleService(jobPosts[currentJobPostIndex]);
    scaleService(jobApplication[currentJobApplicationIndex]);
  }
}

/////////////////////////////////////////////////////////

function scaleService(serviceConfig) {
  const { serviceName, requestCount } = serviceConfig;

  exec(
    `docker service inspect --format="{{.Spec.Mode.Replicated.Replicas}}" ${serviceName}`,
    (error, stdout) => {
      if (error) {
        console.error(`Error scaling ${serviceName}: ${error.message}`);
        return;
      }

      const currentReplicas = parseInt(stdout) || 0;
      console.log(`Current replicas for ${serviceName}: ${currentReplicas}`);

      if (currentReplicas < MAX_REPLICAS && requestCount > REQUEST_THRESHOLD) {
        const desiredReplicas = Math.min(MAX_REPLICAS, currentReplicas + 1);
        console.log(
          `Scaling up ${serviceName} to ${desiredReplicas} replicas...`
        );
        serviceConfig.requestCount = 0;
        exec(
          `docker service scale ${serviceName}=${desiredReplicas}`,
          (scaleError) => {
            if (scaleError) {
              console.error(
                `Error scaling ${serviceName}: ${scaleError.message}`
              );
            } else {
              serviceConfig.requestCount = 0;
            }
          }
        );
      }
    }
  );
}

function checkAndScale() {
  console.log(
    `Onboard Request count is - (${employeeOnboard[currentEmployeeIndex].requestCount})`
  );
  console.log(
    `Tenant Request count is - (${tenantManagement[currentTenantIndex].requestCount})`
  );
  console.log(
    `Job post request count is - (${jobPosts[currentJobPostIndex].requestCount})`
  );
  console.log(
    `Job application Request count is - (${jobApplication[currentJobApplicationIndex].requestCount})`
  );
  console.log("=================================");
  scaleService(employeeOnboard[currentEmployeeIndex]);
  scaleService(tenantManagement[currentTenantIndex]);
  scaleService(jobPosts[currentJobPostIndex]);
  scaleService(jobApplication[currentJobApplicationIndex]);
}

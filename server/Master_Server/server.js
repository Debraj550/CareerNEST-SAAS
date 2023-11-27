import express from "express";
import httpProxy from "http-proxy";
import { exec } from "child_process";

const app = express();
const proxy = httpProxy.createProxyServer();

const tenantManagement = [
  {
    serviceName: "cloud_project_tenant_service",
    url: "http://cloud_project_tenant_service:8001",
    replicas: 0,
    requestCount: 0,
  },
];

const employeeOnboard = [
  {
    serviceName: "cloud_project_employee_onboarding_service",
    url: "http://cloud_project_employee_onboarding_service:8002",
    replicas: 0,
    requestCount: 0,
  },
];

const PORT = 8080;
const MAX_REPLICAS = 10;
const REQUEST_THRESHOLD = 2;

let currentTenantIndex = 0;
let currentEmployeeIndex = 0;

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

async function scaleInstances() {
  for (let i = 0; i < 2; i++) {
    scaleService(employeeOnboard[currentEmployeeIndex]);
    scaleService(tenantManagement[currentTenantIndex]);
  }
}

function scaleService(serviceConfig) {
  const { serviceName, replicas, requestCount } = serviceConfig;

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
  //   console.log("Employee instances:", employeeOnboard);
  //   console.log("Tenant instances:", tenantManagement);

  scaleService(employeeOnboard[currentEmployeeIndex]);
  scaleService(tenantManagement[currentTenantIndex]);
  console.log(
    `Onboard Request count is normal (${employeeOnboard[currentEmployeeIndex].requestCount})`
  );
  console.log(
    `Tenant Request count is normal (${tenantManagement[currentTenantIndex].requestCount})`
  );
  console.log("=================================");
}

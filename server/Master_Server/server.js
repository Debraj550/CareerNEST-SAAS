import express from "express";
import httpProxy from "http-proxy";
import Docker from "dockerode";

const app = express();
const proxy = httpProxy.createProxyServer();
const docker = new Docker();

const tenantManagement = [
  {
    serviceName: "tenant_service",
    url: "http://tenant_service:8001",
    replicas: 0,
  },
];

const employeeOnboard = [
  {
    serviceName: "employee_onboarding_service",
    url: "http://employee_onboarding_service:8002",
    replicas: 0,
  },
];

const PORT = 8080;
const MAX_REPLICAS = 10;
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
  setInterval(checkAndScale, 10000); // Adjust the interval as needed
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
    await scaleService(employeeOnboard[currentEmployeeIndex]);
    await scaleService(tenantManagement[currentTenantIndex]);
  }
}

async function scaleService(serviceConfig) {
  const { serviceName, replicas } = serviceConfig;

  try {
    const service = await docker.getService(serviceName).inspect();

    const currentReplicas = service.Spec.Mode.Replicated.Replicas || 0;
    console.log(`Current replicas for ${serviceName}: ${currentReplicas}`);

    if (currentReplicas < MAX_REPLICAS && replicas > REQUEST_THRESHOLD) {
      const desiredReplicas = Math.min(MAX_REPLICAS, currentReplicas + 1);
      console.log(
        `Scaling up ${serviceName} to ${desiredReplicas} replicas...`
      );

      await docker.getService(serviceName).update({
        replicas: desiredReplicas,
      });
    }
  } catch (error) {
    console.error(`Error scaling ${serviceName}: ${error.message}`);
  }
}

async function checkAndScale() {
  console.log("Employee instances:", employeeOnboard);
  console.log("Tenant instances:", tenantManagement);

  await scaleService(employeeOnboard[currentEmployeeIndex]);
  await scaleService(tenantManagement[currentTenantIndex]);

  console.log(`Onboard Request count is normal (${onboardReqCount})`);
  console.log(`Tenant Request count is normal (${tenantReqCount})`);

  onboardReqCount = 0;
  tenantReqCount = 0;
}

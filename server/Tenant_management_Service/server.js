import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import dbConfig from "./utils/dbconnection.js";
import dotenv from "dotenv";
import registerTenant from "./controllers/registerTenants.js";
import getAllTenants from "./controllers/getAllTenants.js";
import loginTenant from "./controllers/loginTenant.js";
import getAllTenantServices from "./controllers/getAllTenantServices.js";
dotenv.config();

const db = knex(dbConfig.development);
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get default
app.get("/api/tenant/get-tenant-services", async (req, res) => {
  getAllTenantServices(req, res, db);
});

// Get all tenants
app.get("/api/tenant/get-all-tenants", (req, res) => {
  getAllTenants(req, res, db);
});

// Register a tenant
app.post("/api/tenant/register-tenant", (req, res) => {
  registerTenant(req, res, db);
});

app.post("/api/tenant/login-tenant", (req, res) => {
  loginTenant(req, res, db);
});

// Set tenant loadbalancer
app.post("/api/tenant/set-load-balancer", (req, res) => {});

// Set tenant autoscalar
app.post("/api/tenant/set-auto-scalar", (req, res) => {});

app.listen(process.env.PORT, async () => {
  try {
    await db.raw("SELECT 1");
    console.log("Postgres Connected");
  } catch (e) {
    console.log("Postgres Not Connected");
    console.log(e.message);
  }
  console.log(`Server started on http://localhost:${process.env.PORT}/`);
});

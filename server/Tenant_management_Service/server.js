import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import dbConfig from "./utils/dbconnection.js";
import dotenv from "dotenv";
import tenantController from "./controllers/tenantController.js";
dotenv.config();

const db = knex(dbConfig.development);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.status(200).json("API Working for Tenant Management service");
});

app.get("/api/tenant/get-all-tenants", (req, res) => {
  tenantController.getAllTenants(req, res, db);
});

app.post("/api/tenant/set-load-balancer", (req, res) => {});

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

// All Imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import dbConfig from "./utils/dbconnection.js";
import dotenv from "dotenv";
dotenv.config();

// Controller Imports

// Database configuration
const db = knex(dbConfig.development);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.status(200).json("API Working");
});
app.get("/api/tenant/get-all-tenants", async (req, res) => {
  try {
    const response = await db.select("*").from("tenantcountries");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

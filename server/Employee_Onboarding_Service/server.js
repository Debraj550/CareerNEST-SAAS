import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";
import dbConfig from "./utils/dbconnection.js";
import dotenv from "dotenv";
import regissterEmployee from "./controller/RegisterEmployee.js";
import { loginEmployee } from "./controller/loginEmployee.js";

dotenv.config();
const db = knex(dbConfig.development);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/onboard/", async (req, res) => {
  console.log("Received request for /api/onboard/checkstatus");
  res
    .status(200)
    .json({ message: "API Working for Employee Onboarding service." });
});

app.post("/api/onboard/employee-register", (req, res) => {
  regissterEmployee(req, res, db);
});

app.post("/api/onboard/employee-login", (req, res) => {
  loginEmployee(req, res, db);
});

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

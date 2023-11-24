import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";
import dbConfig from "./utils/dbconnection.js";
import dotenv from "dotenv";

dotenv.config();
const db = knex(dbConfig.development);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/onboard/", async (req, res) => {
  console.log("Received request for /api/onboard/checkstatus");
  try {
    const response = await db.select("*").from("employeeRegister");
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
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

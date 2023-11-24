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

app.get("/", async (req, res) => {
  res.status(200).json("API Working for Onboardig Service");
});

app.post("/api/onboard", (req, res) => {
  signin.signinHandler(req, res, db, bcrypt);
});

app.post("/api/onboard", (req, res) => {
  register.registerHandler(req, res, db, bcrypt);
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

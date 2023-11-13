import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import dbConfig from "./dbconnection.js";

dotenv.config();
const db = knex(dbConfig.development);
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
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

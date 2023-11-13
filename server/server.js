// All the Imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";
import dbConfig from "./utils/dbconnection.js";
import dotenv from "dotenv";
dotenv.config();

// Database configuration
const db = knex(dbConfig.development);

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(process.env.PORT, async () => {
  await db
    .raw("SELECT 1")
    .then(() => {
      console.log("Postgres Connected");
    })
    .catch((e) => {
      console.log("Postgres Not Connected");
      console.log(e);
    });
  console.log(`Server started on http://localhost:${process.env.PORT}/`);
});

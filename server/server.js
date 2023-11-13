// All the Imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// Database configuration
const db = knex({
  client: "pg",
  connection: {
    // host: process.env.postgres_HOST,
    // port: process.env.postgres_PORT,
    // user: process.env.postgres_USER,
    // password: process.env.postgres_PASSWORD,
    // database: process.env.postgres_DATABASE,
    connectionString: process.env.postgres_URL + "?sslmode=require",
  },
});

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(process.env.PORT, async () => {
  await db
    .raw("SELECT * 1")
    .then(() => {
      console.log("Postgres Connected");
    })
    .catch((e) => {
      console.log("Postgres Not Connected");
      console.log(e.message);
    });
  console.log(`Server started on http://localhost:${process.env.PORT}/`);
});

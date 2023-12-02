import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import dbConfig from "./utils/dbconnection.js";
import postJobDetails from "./controller/postJobDetails.js";
import getJobDetails from "./controller/getJobDetails.js";

dotenv.config();

const db = knex(dbConfig.development);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/job_post/post-job", (req, res) => {
  postJobDetails(req, res, db);
});

app.get("/api/job_post/get-job", (req, res) => {
  getJobDetails(req, res, db);
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

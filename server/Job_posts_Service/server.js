import express from 'express';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import dbConfig from "./utils/dbconnection.js";

dotenv.config();


const db = knex(dbConfig.development);

const app = express();
app.use(cors());
app.use(bodyParser.json());


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

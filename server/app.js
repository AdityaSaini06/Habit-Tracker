import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Pool } from "pg";

const app = express();
const PORT = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((error, client, release) => {
  if (error) return console.error("Error acquiring client", error.stack);
  client.query("SELECT NOW()", (err, res) => {
    release();
    if (err) return console.error("Error ececuting query", err.stack);
    console.log("Connected to Database", res.rows);
  });
});

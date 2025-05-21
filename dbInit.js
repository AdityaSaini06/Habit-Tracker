import pool from "./config/db.js"
import fs from "fs";
import path from "path";

const schemaPath = path.join("schema", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

pool
    .query(schema)
    .then(() => {
        console.log("Database initialized successfully");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error initializing DB:", err);
        process.exit(1);
    });

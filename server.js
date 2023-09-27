import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.get("/events", (req, res) => {
  db.query("SELECT * FROM fullcalendar_scheduler_events", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/resources", (req, res) => {
  db.query("SELECT * FROM fullcalendar_scheduler_resources", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/events", (req, res) => {
  console.log("Received POST request on /events");
  console.log("Received data:", req.body);

  const { title, start, end, resourceId } = req.body;
  db.query(
    "INSERT INTO fullcalendar_scheduler_events (title, start, end, resourceId) VALUES (?, ?, ?, ?)",
    [title, start, end, resourceId],
    (err, result) => {
      if (err) throw err;
      console.log("Event added with ID:", result.insertId);
      res.send({ id: result.insertId });
    }
  );
});

app.put("/events/:id", (req, res) => {
  const { id } = req.params;
  const { start, end, resourceId } = req.body;
  db.query(
    "UPDATE fullcalendar_scheduler_events SET start = ?, end = ?, resourceId = ? WHERE id = ?",
    [start, end, resourceId, id],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM fullcalendar_scheduler_events WHERE id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

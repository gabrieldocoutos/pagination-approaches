import express from 'express'
import sqlite from 'sqlite3'
import { join, dirname } from 'path'


const sqlite3 = sqlite.verbose();

const app = express();
const PORT = 3001;
const DB_PATH = join(dirname("."), "database.db");

// Connect to SQLite database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to fetch all users
app.get("/users", (req, res) => {
    const limit = req.query.limit ?? 10;
    const offset  = req.query.offset ?? 0;

  db.all(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

// Endpoint to add a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.run(query, [name, email], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, name, email });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

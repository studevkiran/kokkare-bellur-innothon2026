
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup
const dbPath = join(__dirname, 'pledges.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS pledges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      name TEXT NOT NULL,
      village TEXT NOT NULL,
      district TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      message TEXT,
      consent BOOLEAN NOT NULL
    )`);
    }
});

// Routes

// POST: Add a new supporter
app.post('/api/pledge', (req, res) => {
    const { name, village, district, phone, email, message, consent } = req.body;

    if (!name || !village || !district || !consent) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `INSERT INTO pledges (name, village, district, phone, email, message, consent) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [name, village, district, phone, email, message, consent ? 1 : 0];

    db.run(sql, params, function (err) {
        if (err) {
            console.error(err.message);
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'Thank you for your support!',
            data: { id: this.lastID }
        });
    });
});

// GET: Export as CSV
app.get('/api/pledges/csv', (req, res) => {
    const sql = `SELECT * FROM pledges ORDER BY timestamp DESC`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        // Convert to CSV
        const headers = ['id', 'timestamp', 'name', 'village', 'district', 'phone', 'email', 'message'];
        const csvRows = [];
        csvRows.push(headers.join(','));

        rows.forEach(row => {
            const values = headers.map(header => {
                const val = row[header] ? row[header].toString().replace(/"/g, '""') : ''; // Escape quotes
                return `"${val}"`;
            });
            csvRows.push(values.join(','));
        });

        const csvContent = csvRows.join('\n');

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename="kokkare_bellur_pledges.csv"');
        res.send(csvContent);
    });
});

/*
// GET: Get all pledges (optional, for admin or count)
app.get('/api/pledges', (req, res) => {
    const sql = "SELECT count(*) as count FROM pledges";
    db.get(sql, [], (err, row) => {
        if (err) {
          return res.status(400).json({"error":err.message});
        }
        res.json({
            "count": row.count
        })
      });
});
*/


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

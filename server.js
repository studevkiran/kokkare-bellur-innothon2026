
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
        
        // Token requests table
        db.run(`CREATE TABLE IF NOT EXISTS token_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request_id TEXT UNIQUE NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_name TEXT,
      action_type TEXT NOT NULL,
      bird_species TEXT,
      confidence REAL,
      location TEXT,
      tokens_requested INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      admin_notes TEXT,
      allocated_at DATETIME
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

// === BLOCKCHAIN INTEGRATION ENDPOINTS ===

// POST: Request conservation tokens
app.post('/api/conservation/request-token', (req, res) => {
    const { 
        userName, 
        actionType, 
        birdSpecies, 
        confidence, 
        location, 
        tokensRequested 
    } = req.body;

    if (!actionType || !tokensRequested) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const requestId = `REQ-KB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const sql = `INSERT INTO token_requests 
        (request_id, user_name, action_type, bird_species, confidence, location, tokens_requested, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`;
    
    const params = [requestId, userName, actionType, birdSpecies, confidence, location, tokensRequested];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Token request error:', err.message);
            return res.status(400).json({ error: err.message });
        }
        
        // In production, this would trigger notification to blockchain admin
        console.log(`✅ Token request created: ${requestId}`);
        console.log(`   Action: ${actionType}, Species: ${birdSpecies}, Tokens: ${tokensRequested}`);
        
        res.json({
            success: true,
            requestId: requestId,
            message: 'Token request submitted to Conservation Authority',
            status: 'pending',
            estimatedTokens: tokensRequested
        });
    });
});

// POST: Webhook for token allocation confirmation (called by blockchain admin)
app.post('/api/token-allocated', (req, res) => {
    const { requestId, status, adminNotes } = req.body;

    if (!requestId) {
        return res.status(400).json({ error: 'Missing requestId' });
    }

    const sql = `UPDATE token_requests 
        SET status = ?, admin_notes = ?, allocated_at = CURRENT_TIMESTAMP 
        WHERE request_id = ?`;
    
    const params = [status || 'approved', adminNotes || '', requestId];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Token allocation update error:', err.message);
            return res.status(400).json({ error: err.message });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        
        console.log(`✅ Token allocation updated: ${requestId} → ${status}`);
        
        res.json({
            success: true,
            message: 'Token allocation recorded',
            requestId: requestId
        });
    });
});

// GET: Get token requests (for admin dashboard)
app.get('/api/token-requests', (req, res) => {
    const status = req.query.status; // optional filter: pending, approved, rejected
    
    let sql = `SELECT * FROM token_requests`;
    let params = [];
    
    if (status) {
        sql += ` WHERE status = ?`;
        params.push(status);
    }
    
    sql += ` ORDER BY timestamp DESC LIMIT 100`;

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        
        res.json({
            success: true,
            count: rows.length,
            requests: rows
        });
    });
});

// GET: Get single token request status
app.get('/api/token-requests/:requestId', (req, res) => {
    const { requestId } = req.params;
    
    const sql = `SELECT * FROM token_requests WHERE request_id = ?`;

    db.get(sql, [requestId], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Request not found' });
        }
        
        res.json({
            success: true,
            request: row
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

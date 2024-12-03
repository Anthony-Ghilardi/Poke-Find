const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();
const requests = require('./routes/requests');
const app = express();
const PORT = process.env.PORT || 8000;

// Deployment devlopment cors setup
// app.use(cors({
//     origin: 'https://poke-find-production.up.railway.app'
// }));

// Local dev cor setup
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use('/pokemon', requests);

const db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
    }
    done();
});

app.get('/', (req, res) => {
    return res.json("Hi from pqsql backend");
})

app.get('/users', async (req, res) => {
    const result = await db.query ("SELECT * FROM users");
    res.json(result.rows);
})

app.post('/adduser', async (req, res) => {
    try {
        const { email, oauth_provider, oauth_id, } = req.body;

        const result = await db.query(
            "INSERT INTO users (email, oauth_provider, oauth_id) VALUES ($1, $2, $3) RETURNING*",
            [email, oauth_provider, oauth_id]
        );
        res.status(201).json({
            message: "User added successfully",
            user: result.rows[0],
        });
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).json({ error: "Database error" });
    }
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

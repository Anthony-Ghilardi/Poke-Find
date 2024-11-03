const express = require('express');
const cors = require('cors');
require('dotenv').config();
const requests = require('./routes/requests');
const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors({
    origin: 'https://poke-find-production.up.railway.app'
}));

app.use(express.json());
app.use('/pokemon', requests);

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

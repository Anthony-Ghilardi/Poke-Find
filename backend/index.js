const express = require('express');
const cors = require('cors');
require('dotenv').config();
const requests = require('./routes/requests');
const app = express();
const PORT = process.env.PORT || 8000;

// Deployment devlopment cor setup
// app.use(cors({
//     origin: 'https://poke-find-production.up.railway.app'
// }));

// Local dev cor setup
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use('/pokemon', requests);

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

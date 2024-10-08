const express = require('express');
require('dotenv').config();
const requests = require('./routes/requests');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/pokemon', requests);

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

const express = require("express");
const router = express.Router();

router.get("/", async (req,res) => { 
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/arceus")
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data from Pokemon API", error);
        res.status(500).json({ error: "Failed to fetch pokemon data "});
    }
});

module.exports = router;
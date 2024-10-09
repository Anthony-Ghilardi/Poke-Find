const express = require("express");
const router = express.Router();

router.get("/", async (req,res) => { 
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/charmander")
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data from Pokemon API", error);
        res.status(500).json({ error: "Failed to fetch pokemon data "});
    }
});

router.get("/types", async (req, res) => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/charmander")
        const data = await response.json();
        const types = data.types;
        res.json(types);
    } catch (error) {
        console.error("Error fetching data from Pokemon API", error);
        res.status(500).json({ error: "Failed to fetch pokemon data"})
    }
});

router.get("/sprites", async (req, res) => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon-form/charmander")
        const data = await response.json();
        const sprites = data.sprites;
        res.json(sprites);
    } catch (error) {
        console.error("Error fetching data from Pokemon API", error);
        res.status(500).json({ error: "Failed to fetch pokemon data"})
    }
});

router.get("/description", async (req, res) => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/charmander")
        const data = await response.json();
        
        const englishFlavorText = data.flavor_text_entries.find(entry => entry.language.name === "en");
        const description = englishFlavorText ? englishFlavorText.flavor_text : "No description available";
        res.json({ description });
    } catch (error) {
        console.error("Error fetching data from Pokemon API", error);
        res.status(500).json({ error: "Failed to fetch pokemon data"})
    }
})

module.exports = router;
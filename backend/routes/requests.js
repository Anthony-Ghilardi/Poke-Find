const express = require("express");
const axios = require("axios");
const router = express.Router();

// New test route
router.get("/:name", async (req, res) => {
  const pokemonName = req.params.name.toLowerCase();
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: "Pokemon not found" });
  }
});

router.get("/description", async (req, res) => {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/charmander"
    );
    const data = await response.json();

    const englishFlavorText = data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const description = englishFlavorText
      ? englishFlavorText.flavor_text
      : "No description available";
    res.json({ description });
  } catch (error) {
    console.error("Error fetching data from Pokemon API", error);
    res.status(500).json({ error: "Failed to fetch pokemon data" });
  }
});

module.exports = router;

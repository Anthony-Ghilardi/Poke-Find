const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/pokemon-species/:name", async (req, res) => {
  const pokemonName = req.params.name.toLowerCase();
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: "Pokemon species not found" });
  }
});

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

module.exports = router;

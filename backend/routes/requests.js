const express = require("express");
const router = express.Router();

router.get("/", (req,res) => { 
    const data = [{
        name: "Charmander",
        type: "Fire"
    }]
    res.json(data);
});

module.exports = router;
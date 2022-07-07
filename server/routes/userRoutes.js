const express = require("express");

const router = express.Router();

router.get("/movies", (req, res) => {
  res.send("Movies");
});

module.exports = router;

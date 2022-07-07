const express = require("express");
const { createUser } = require("../controllers/userControllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Movies");
});
router.post("/user", createUser);

module.exports = router;

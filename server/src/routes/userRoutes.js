const express = require("express");
const { userControllers } = require("../controllers");


const router = express.Router();

router.get("/", (req, res) => {
  res.send("Movies");
});
router.post("/user", userControllers.createUser);

module.exports = router;

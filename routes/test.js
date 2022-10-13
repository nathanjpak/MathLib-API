const express = require("express");
const router = express.Router();

router.get('/123', (req, res) => {
  res.send("You found the test page!")
});

module.exports = router;

const express = require("express");
const { generateImage } = require("../controllers/openaiController");
const router = express.Router();

router.post("/generateimage", generateImage);

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const locationController = require("../controllers/query");

// Route POST /api/location/search
router.post("/search", locationController.getPredictedFrames);

module.exports = router;

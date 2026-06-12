const express = require("express");

const {
  getAllTreks,
  getAllMapPoints,
  searchTreks,
  filterTreks,
} = require("../controllers/trekController");

const router = express.Router();

router.get("/", getAllTreks);
router.get("/map-points", getAllMapPoints);  // NEW: for map markers
router.get("/search", searchTreks);
router.get("/filter", filterTreks);

module.exports = router;
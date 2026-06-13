const express = require("express");

const {
  getAllTreks,
  getAllMapPoints,
  searchTreks,
  filterTreks,
  getRouteToTrek,  // ← Make sure this is imported
} = require("../controllers/trekController");

const router = express.Router();

router.get("/", getAllTreks);
router.get("/map-points", getAllMapPoints);
router.get("/search", searchTreks);
router.get("/filter", filterTreks);
router.get("/route", getRouteToTrek);  // ← ADD THIS LINE

module.exports = router;
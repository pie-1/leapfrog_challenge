const express = require("express");
const {
  getAllTreks,
  getAllMapPoints,
  searchTreks,
  filterTreks,
  getRouteToTrek,
} = require("../controllers/trekController");

const router = express.Router();

router.get("/", getAllTreks);
router.get("/map-points", getAllMapPoints);
router.get("/search", searchTreks);
router.get("/filter", filterTreks);
router.get("/route", getRouteToTrek);

module.exports = router;
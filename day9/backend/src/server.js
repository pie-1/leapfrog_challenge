const express = require("express");
const cors = require("cors");

const trekRoutes = require("./routes/trekRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/treks", trekRoutes);

// Add this test route before app.listen
app.get('/api/test-passes', (req, res) => {
  const { loadMountainPasses } = require('./utils/geojsonParser');
  const passes = loadMountainPasses();
  res.json({
    total: passes.length,
    firstThree: passes.slice(0, 3)
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
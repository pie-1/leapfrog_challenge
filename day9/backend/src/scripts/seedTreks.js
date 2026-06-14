const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trek = require('../models/Trek');

dotenv.config();

const treks = [
  {
    name: "Everest Base Camp",
    duration: "14 Days",
    difficulty: "Hard",
    altitude: 5364,
    budget: 80000,
    location: "Solukhumbu",
    region: "Khumbu",
    coordinates: [27.9881, 86.925],
    description: "Classic trek to the world's highest mountain base camp",
    bestSeason: "March-May, Sept-Nov",
    permits: ["Sagarmatha National Park Permit", "TIMS Card"]
  },
  {
    name: "Annapurna Circuit",
    duration: "16 Days",
    difficulty: "Hard",
    altitude: 5416,
    budget: 75000,
    location: "Manang",
    region: "Annapurna",
    coordinates: [28.5983, 83.9311],
    description: "Round the Annapurna massif through Thorong La pass",
    bestSeason: "April-May, Oct-Nov",
    permits: ["ACAP Permit", "TIMS Card"]
  },
  {
    name: "Mardi Himal",
    duration: "5 Days",
    difficulty: "Easy",
    altitude: 4500,
    budget: 25000,
    location: "Pokhara",
    region: "Annapurna",
    coordinates: [28.3955, 83.8779],
    description: "Short trek with stunning views of Machhapuchhre",
    bestSeason: "March-May, Sept-Dec",
    permits: ["ACAP Permit", "TIMS Card"]
  }
];

const seedTreks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Trek.deleteMany();
    await Trek.insertMany(treks);
    console.log('✅ Treks seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding treks:', error);
    process.exit(1);
  }
};

seedTreks();
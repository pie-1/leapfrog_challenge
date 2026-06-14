const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trek = require('../models/Trek');

dotenv.config();

// Your existing trek data
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
    image: "/images/everest.jpg",
    description: "Classic trek to the world's highest mountain base camp",
    bestSeason: "March-May, Sept-Nov"
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
    image: "/images/annapurna.jpg",
    description: "Round the Annapurna massif through Thorong La pass",
    bestSeason: "April-May, Oct-Nov"
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
    image: "/images/mardi.jpg",
    description: "Short trek with stunning views of Machhapuchhre",
    bestSeason: "March-May, Sept-Dec"
  },
  {
    name: "Langtang Valley",
    duration: "8 Days",
    difficulty: "Moderate",
    altitude: 3870,
    budget: 35000,
    location: "Rasuwa",
    region: "Langtang",
    coordinates: [28.2138, 85.556],
    image: "/images/langtang.jpg",
    description: "Valley of glaciers and sacred lakes",
    bestSeason: "March-May, Oct-Nov"
  },
  {
    name: "Poon Hill",
    duration: "4 Days",
    difficulty: "Easy",
    altitude: 3210,
    budget: 18000,
    location: "Myagdi",
    region: "Annapurna",
    coordinates: [28.4012, 83.6942],
    image: "/images/poonhill.jpg",
    description: "Sunrise viewpoint over Annapurna and Dhaulagiri",
    bestSeason: "Oct-Dec, March-May"
  },
  {
    name: "Manaslu Circuit",
    duration: "14 Days",
    difficulty: "Hard",
    altitude: 5106,
    budget: 90000,
    location: "Gorkha",
    region: "Manaslu",
    coordinates: [28.5500, 84.8667],
    image: "/images/manaslu.jpg",
    description: "Remote circuit around 8th highest peak",
    bestSeason: "Sept-Nov"
  },
  {
    name: "Upper Mustang",
    duration: "12 Days",
    difficulty: "Moderate",
    altitude: 3840,
    budget: 120000,
    location: "Mustang",
    region: "Mustang",
    coordinates: [29.1833, 83.9333],
    image: "/images/mustang.jpg",
    description: "Forbidden kingdom with Tibetan Buddhist culture",
    bestSeason: "May-Oct"
  },
  {
    name: "Gokyo Lakes",
    duration: "12 Days",
    difficulty: "Moderate",
    altitude: 4800,
    budget: 85000,
    location: "Solukhumbu",
    region: "Khumbu",
    coordinates: [27.9567, 86.6757],
    image: "/images/gokyo.jpg",
    description: "Sacred lakes with Everest views",
    bestSeason: "March-May, Oct-Nov"
  },
  {
    name: "Kanchenjunga Base Camp",
    duration: "20 Days",
    difficulty: "Hard",
    altitude: 5140,
    budget: 110000,
    location: "Taplejung",
    region: "Kanchenjunga",
    coordinates: [27.7027, 88.1369],
    image: "/images/kanchenjunga.jpg",
    description: "Remote trek to world's 3rd highest peak",
    bestSeason: "April-May, Oct-Nov"
  },
  {
    name: "Ghorepani Poon Hill",
    duration: "3 Days",
    difficulty: "Easy",
    altitude: 2874,
    budget: 15000,
    location: "Myagdi",
    region: "Annapurna",
    coordinates: [28.3962, 83.6931],
    image: "/images/ghorepani.jpg",
    description: "Short trek with sunrise over Annapurna range",
    bestSeason: "All year"
  }
];

const migrateTreks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing treks
    await Trek.deleteMany();
    console.log('🗑️  Cleared existing treks');
    
    // Insert new treks
    await Trek.insertMany(treks);
    console.log(`✅ Migrated ${treks.length} treks to MongoDB`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
};

migrateTreks();
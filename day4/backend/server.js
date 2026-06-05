// === FIX FOR CRYPTO ERROR ===
const crypto = require('crypto');
global.crypto = crypto;
// =============================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', require('./routes/notes'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB Connected Successfully'))
  .catch(err => console.error(' MongoDB Error:', err.message));

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
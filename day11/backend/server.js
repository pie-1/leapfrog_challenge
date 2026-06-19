import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/colorbook')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Page Schema
const pageSchema = new mongoose.Schema({
  name: String,
  category: String,
  imageData: String, // Base64 SVG or JSON line art
  difficulty: String, // Easy, Medium, Hard
  createdAt: { type: Date, default: Date.now }
});

const Page = mongoose.model('Page', pageSchema);

// Routes
app.get('/api/pages', async (req, res) => {
  const pages = await Page.find();
  res.json(pages);
});

app.get('/api/pages/:id', async (req, res) => {
  const page = await Page.findById(req.params.id);
  res.json(page);
});

app.post('/api/pages', async (req, res) => {
  const page = new Page(req.body);
  await page.save();
  res.json(page);
});

app.listen(5000, () => console.log('Server running on port 5000'));
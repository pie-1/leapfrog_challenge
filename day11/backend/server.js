import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pageRoutes from './src/routes/pageRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('mongo connected'))
  .catch(err => console.error('mongoDB error',err));

// routes
app.use('/api/pages',pageRoutes);

//root route
app.get('/' ,(req,res) => {
  res.json({message : 'colorMe API is running!'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`server running on port ${PORT}`));

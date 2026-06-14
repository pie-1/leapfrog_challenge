const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/treks', require('./routes/trekRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middleware/errorHandler');
const { limiter } = require('./middleware/rateLimiter');
const logger = require('./utils/logger');
const routes = require('./routes');

const app = express();

// middleware
app.use(helmet({
    crossOriginResourcePolicy: {policy: "cross-origin"}
}));

app.use(compression());

//cors configuration
app.use(cors({
    origin:process.env.FRONTEND_URL || 'http://localhost:5713',
    credentials:true,
    optionsSuccessStatus:200
}))

// Rate limiting
app.use('/api',limiter);

//body parser
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true,limit:'10mb'}));

// data sanitization against NoSQL query injection

app.use(mongoSanitize());

// data sanitization against xss
app.use((req, res, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
});

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
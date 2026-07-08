require('dotenv').config();

const app = require('./src/app');
const { connectDB } = require('./src/config/database');
const { createSocketServer } = require('./src/config/socket');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 5000;

//handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

//connect to mongodb
connectDB();

//create http server
const server = app.listen(PORT,() => {
    logger.info(`Server is running on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV}`);
})

// initialize socket.io

const io = createSocketServer(server);
app.set('io', io);

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(error.message, error);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info(' Process terminated!');
  });
});
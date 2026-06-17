import { Server } from 'socket.io';
import cors from 'cors';

const io = new Server(3001, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Store shapes per room
const rooms = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);

    // Send existing shapes to new user
    if (rooms[roomId]) {
      socket.emit('init-shapes', rooms[roomId]);
    }
  });

  // Handle new shape
  socket.on('add-shape', ({ roomId, shape }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push(shape);
    socket.to(roomId).emit('shape-added', shape);
  });

  // Handle shape update (move/resize)
  socket.on('update-shape', ({ roomId, shapeId, updates }) => {
    if (rooms[roomId]) {
      const index = rooms[roomId].findIndex(s => s.id === shapeId);
      if (index !== -1) {
        rooms[roomId][index] = { ...rooms[roomId][index], ...updates };
        socket.to(roomId).emit('shape-updated', { shapeId, updates });
      }
    }
  });

  // Handle shape delete
  socket.on('delete-shape', ({ roomId, shapeId }) => {
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter(s => s.id !== shapeId);
      socket.to(roomId).emit('shape-deleted', shapeId);
    }
  });

  // Handle clear
  socket.on('clear-canvas', ({ roomId }) => {
    if (rooms[roomId]) {
      rooms[roomId] = [];
      io.to(roomId).emit('canvas-cleared');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

console.log('Server running on port 3001');
import { Server } from 'socket.io';
import cors from 'cors';

const io = new Server(3001, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Store shapes per room
const rooms = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
    if (rooms[roomId]) {
      socket.emit('init-shapes', rooms[roomId]);
    }
  });

  socket.on('add-shape', ({ roomId, shape }) => {
    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push(shape);
    socket.to(roomId).emit('shape-added', shape);
  });

  socket.on('update-shape', ({ roomId, shapeId, updates }) => {
    const roomShapes = rooms[roomId];
    if (roomShapes) {
      const index = roomShapes.findIndex(s => s.id === shapeId);
      if (index !== -1) {
        roomShapes[index] = { ...roomShapes[index], ...updates };
        socket.to(roomId).emit('shape-updated', { shapeId, updates });
      }
    }
  });

  socket.on('delete-shape', ({ roomId, shapeId }) => {
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter(s => s.id !== shapeId);
      socket.to(roomId).emit('shape-deleted', shapeId);
    }
  });

  socket.on('clear-canvas', ({ roomId }) => {
    if (rooms[roomId]) {
      rooms[roomId] = [];
      io.to(roomId).emit('canvas-cleared');
    }
  });

  // NEW: sync entire shapes (for undo/redo)
  socket.on('sync-shapes', ({ roomId, shapes }) => {
    rooms[roomId] = shapes;
    socket.to(roomId).emit('shapes-synced', shapes);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

console.log('Server running on port 3001');
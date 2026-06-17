import { Server } from 'socket.io';
import cors from 'cors';

const io = new Server(3001, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Store drawing history for new users
let drawingHistory = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send history to new user
  socket.emit('init', drawingHistory);

  socket.on('draw', (data) => {
    drawingHistory.push(data);
    socket.broadcast.emit('draw', data);
  });

  socket.on('clear', () => {
    drawingHistory = [];
    io.emit('clear');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

console.log('Server running on port 3001');
import { Server } from "socket.io";
import cors from 'cors';

const io = new Server(3000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
       socket.on('clear', () => {
    socket.broadcast.emit('clear');
    }); 
  console.log('User connected:', socket.id);

  socket.on('draw', (data) => {
    // Broadcast drawing to everyone except sender
    socket.broadcast.emit('draw', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


console.log('Server running on port 3000');
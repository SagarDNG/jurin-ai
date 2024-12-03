const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from your frontend
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for messages from clients
  socket.on('send-message', (data) => {
    console.log('Message received:', data);
    // Broadcast the message to all connected clients
    socket.broadcast.emit('receive-message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});

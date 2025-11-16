import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoutes.js';
import User from './models/User.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('⚡ Client connected:', socket.id);

  // JOIN ROOM
  socket.on('join_room', (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    const numPlayers = room ? room.size : 0;

    let assignedSymbol;

    if (numPlayers === 0) {
      assignedSymbol = 'X';
    } else if (numPlayers === 1) {
      assignedSymbol = 'O';
    } else {
      socket.emit('room_full');
      return;
    }

    socket.join(roomId);

    // Send symbol to THIS client
    socket.emit('symbol', assignedSymbol);

    // Notify others
    socket.to(roomId).emit('player_joined', socket.id);

    console.log(`Player ${socket.id} joined ${roomId} as ${assignedSymbol}`);
  });

  // HANDLE MOVE
  socket.on('move', ({ roomId, index, symbol }) => {
    socket.to(roomId).emit('opponent_move', { index, symbol });
  });

  // DISCONNECT
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// ---------------------------
//  MONGO + EXPRESS ROUTES
// ---------------------------

await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

await User.init();

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server at http://0.0.0.0:${PORT}`);
});

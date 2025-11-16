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

  socket.on('ping', (msg) => {
    console.log('msg:', msg);
    socket.emit('pong', 'pong from server');
  });
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});
await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));
console.log('Connected DB:', mongoose.connection.db.databaseName);

await User.init();
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${process.env.PORT}`));

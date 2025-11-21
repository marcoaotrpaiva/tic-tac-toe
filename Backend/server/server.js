import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoutes.js';
import User from './models/User.js';

import http from 'http';
import { setupSocket } from './socket/socket.js'; // <--- IMPORTAS AQUI

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar Socket.IO separado
setupSocket(server); // <----- AQUI LIGAS O SOCKET

// Mongo connection
await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

await User.init();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 4000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server at http://0.0.0.0:${PORT}`);
});

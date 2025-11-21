import { Server } from 'socket.io';

const rooms = {}; // state

export function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('⚡ Client connected:', socket.id);

    // JOIN ROOM
    socket.on('join_room', (roomId, playerId) => {
      if (!rooms[roomId]) {
        rooms[roomId] = {
          players: [],
          board: Array(9).fill(null),
          turn: 'X',
        };
      }

      const room = rooms[roomId];

      if (room.players.length >= 2) {
        socket.emit('room_full');
        return;
      }

      const symbol = room.players.length === 0 ? 'X' : 'O';

      room.players.push({
        id: playerId,
        socketId: socket.id,
        symbol,
      });

      socket.join(roomId);

      io.to(roomId).emit('player_count', room.players.length);
      socket.emit('symbol', symbol);

      console.log(`Player ${socket.id} (${playerId}) joined ${roomId} as ${symbol}`);
    });

    // MOVE
    socket.on('move', ({ roomId, index, symbol }) => {
      const room = rooms[roomId];
      if (!room) return;

      if (room.players.length < 2) return;
      if (room.board[index] !== null) return;

      room.board[index] = symbol;

      socket.to(roomId).emit('opponent_move', { index, symbol });

      room.turn = room.turn === 'X' ? 'O' : 'X';
    });

    // DISCONNECT
    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);

      for (const roomId in rooms) {
        const room = rooms[roomId];
        room.players = room.players.filter((p) => p.socketId !== socket.id);

        io.to(roomId).emit('player_count', room.players.length);

        if (room.players.length === 0) delete rooms[roomId];
      }
    });
  });

  return io;
}

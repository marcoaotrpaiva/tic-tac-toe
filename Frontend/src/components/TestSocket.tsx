import { useEffect, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

export default function RoomTest() {
  const [socket, setSocket] = useState<Socket | null>(null); // FIXED
  const [roomId, setRoomId] = useState('test-room');

  useEffect(() => {
    const s: Socket = io('http://localhost:4000', {
      transports: ['websocket'],
    });

    setSocket(s);

    s.on('player_joined', (id) => {
      console.log('👤 Player joined:', id);
    });

    s.on('room_message', (data) => {
      console.log('📩 Message from room:', data);
    });

    return () => {
      s.disconnect(); // VALID CLEANUP
    };
  }, []);

  const joinRoom = () => {
    socket?.emit('join_room', roomId);
  };

  const sendMessage = () => {
    socket?.emit('room_message', {
      roomId,
      message: 'Hello from client',
    });
  };

  return (
    <div>
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={sendMessage}>Send Message to Room</button>
    </div>
  );
}

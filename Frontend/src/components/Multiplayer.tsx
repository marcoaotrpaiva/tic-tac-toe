import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { connectSocket } from '../socket';

interface MultiplayerProps {
  token: string;
}

export default function Multiplayer({ token }: MultiplayerProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const s = connectSocket(); // cookie auth → token not needed here
    setSocket(s);

    // Server events
    s.on('roomCreated', ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      setStatus('Room created. Waiting for second player...');
    });

    s.on('roomReady', ({ players }: { roomId: string; players: string[] }) => {
      setStatus('Both players are here! Game starting...');
      console.log('Players:', players);
    });

    s.on('waitingForPlayer', () => {
      setStatus('Waiting for second player...');
    });

    s.on('errorMessage', (msg: string) => {
      setStatus(msg);
    });

    return () => {
      s.disconnect();
    };
  }, [token]);

  if (!socket) return <p>Connecting...</p>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => socket.emit('createRoom')}>Create Room</button>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={() => socket.emit('joinRoom', { roomId })}>Join Room</button>
      </div>

      <p style={{ marginTop: 20 }}>{status}</p>
    </div>
  );
}

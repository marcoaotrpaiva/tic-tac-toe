import { useEffect, useState } from 'react';
import { connectSocket } from '../socket';

interface Props {
  token: string;
}

export default function Multiplayer({ token }: Props) {
  const [socket, setSocket] = useState<any>(null);
  const [roomId, setRoomId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('Missing token. Please login again.');
      return;
    }

    // 1. Connect socket
    const s = connectSocket(token);
    setSocket(s);

    // 2. Event listeners
    const handleRoomCreated = ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      setStatus('Room created. Waiting for another player...');
    };

    const handleWaiting = () => setStatus('Waiting for second player...');
    const handleError = (msg: string) => setStatus(msg);

    const handleRoomReady = ({ players }: { players: string[] }) => {
      setStatus('Two players ready!');
      console.log('Players:', players);
    };

    s.on('roomCreated', handleRoomCreated);
    s.on('waitingForPlayer', handleWaiting);
    s.on('errorMessage', handleError);
    s.on('roomReady', handleRoomReady);

    // 3. Cleanup
    return () => {
      s.off('roomCreated', handleRoomCreated);
      s.off('waitingForPlayer', handleWaiting);
      s.off('errorMessage', handleError);
      s.off('roomReady', handleRoomReady);
      s.disconnect();
    };
  }, [token]);

  if (!socket) return <p>Connecting socket...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h1>Multiplayer Lobby</h1>

      <button
        onClick={() => {
          console.log('📤 Emitting createRoom');
          socket.emit('createRoom');
        }}
      >
        Create Room
      </button>

      <div style={{ marginTop: 20 }}>
        <input placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        <button onClick={() => socket.emit('joinRoom', { roomId })}>Join Room</button>
      </div>

      <p style={{ marginTop: 20 }}>{status}</p>
    </div>
  );
}

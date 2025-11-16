import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Board from './Board';
import './Room.css';

export default function Room() {
  const { roomId } = useParams<{ roomId: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [symbol, setSymbol] = useState<'X' | 'O' | null>(null);

  useEffect(() => {
    const s: Socket = io('http://192.168.1.241:4000', {
      transports: ['websocket'],
    });

    setSocket(s);

    s.emit('join_room', roomId);

    s.on('symbol', (playerSymbol: 'X' | 'O') => {
      console.log('Assigned symbol:', playerSymbol);
      setSymbol(playerSymbol);
    });

    s.on('player_joined', (id: string) => {
      console.log('Player joined:', id);
    });

    return () => {
      s.disconnect();
    };
  }, [roomId]);

  if (!socket || !symbol) return <div>Joining room...</div>;

  return (
    <div className="room-wrapper">
      <p>Room: {roomId}</p>
      <h2>You are: {symbol}</h2>

      <Board socket={socket} roomId={roomId!} symbol={symbol} />
    </div>
  );
}

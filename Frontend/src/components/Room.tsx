import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Board from './Board';
import './Room.css';

export default function Room() {
  const { state } = useLocation();
  const player = state?.player;

  const { roomId } = useParams<{ roomId: string }>();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [symbol, setSymbol] = useState<'X' | 'O' | null>(null);
  const [playerCount, setPlayerCount] = useState(1);

  // CONNECT SOCKET
  useEffect(() => {
    const s: Socket = io('http://192.168.1.241:4000', {
      transports: ['websocket'],
    });

    setSocket(s);

    s.emit('join_room', roomId, player?.username);

    s.on('symbol', (playerSymbol: 'X' | 'O') => {
      setSymbol(playerSymbol);
    });

    s.on('player_count', (count: number) => {
      setPlayerCount(count);
    });

    return () => {
      s.disconnect();
    };
  }, [roomId, player?.id]);

  if (!socket || !symbol) return <div className="loading">Joining room...</div>;

  return (
    <div className="room-container">
      <div className="room">
        <div className="header-section">
          <h2>
            {player?.username} — You are: <span className="symbol">{symbol}</span>
          </h2>
          <p>Room ID: {roomId}</p>

          {playerCount < 2 && <p className="waiting">Waiting for second player...</p>}
        </div>

        <div className="board-section">
          <Board socket={socket} roomId={roomId!} symbol={symbol} disabled={playerCount < 2} />
        </div>
      </div>
    </div>
  );
}

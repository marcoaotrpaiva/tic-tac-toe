import type { User } from '../types';
import './PlayerCard.css';
import { generateRoomId } from '../utils/generateRoomId';

interface PlayerCardProps {
  player: User;
}
import { useNavigate } from 'react-router-dom';
export default function PlayerCard({ player }: PlayerCardProps) {
  const navigate = useNavigate();
  function handleCreateRoom() {
    const roomId = generateRoomId();
    navigate(`/room/${roomId}`, { state: { player } });
  }
  return (
    <>
      <div className="playercard-container">
        <div className="player-card-player-welcome">
          <h2 style={{ color: 'black', textAlign: 'center', margin: 0 }}>
            <span style={{ fontSize: '1.3rem', opacity: '0.8' }}>Welcome,</span>{' '}
          </h2>
          <h2 style={{ color: 'black', textAlign: 'center', margin: 0 }}>
            <span style={{ fontSize: '1.9rem' }}>{player.username}</span>
          </h2>
          <div className="player-card-player-infos">
            <p>Wins: </p>
            <p>{player.wins}</p>
            <p>Losses: </p>
            <p>{player.losses}</p>nbnm
          </div>
        </div>
        <div className="buttons-row user-page-buttons">
          <button className="room-button " onClick={handleCreateRoom}>
            Create a Room
          </button>
          <button className="room-button">Join a Room</button>
        </div>
        <div className="leaderboard-button-container">
          <button className="room-button leaderboard-button">Leaderboard</button>
        </div>
      </div>
    </>
  );
}

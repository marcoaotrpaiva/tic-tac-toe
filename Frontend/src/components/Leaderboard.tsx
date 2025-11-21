import { useEffect, useState } from 'react';
import './Leaderboard.css';
import type { User as Player } from '../types';

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/leaderboard');
        const json = await res.json();
        setPlayers(json.data);
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
      }
    };

    fetchLeaderBoard();
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard">
        {players.map((player) => (
          <div className="leaderboard-item-container" key={player.username}>
            <p>{player.username}</p>
            <p>{player.wins} wins</p>
          </div>
        ))}
      </div>
    </div>
  );
}

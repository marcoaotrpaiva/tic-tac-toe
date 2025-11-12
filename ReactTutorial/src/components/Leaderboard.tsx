import { useEffect, useState } from 'react';
import './Leaderboard.css';
function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/leaderboard');
        const json = await res.json();
        setPlayers(json.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchLeaderBoard();
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard">
        {players.map((player, index) => (
          <div className="leaderboard-item-container" key={index}>
            <p>{player.username}</p>
            <p>{player.wins} wins</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;

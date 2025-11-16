import './LandingPage.css';
import { useState } from 'react';
import Board from '../components/Board';
import { useLocation } from 'react-router-dom';
function LandingPage() {
  const [winner, setWinner] = useState(null);
  const location = useLocation();
  const username = location.state?.username;

  return (
    <div className="landing-page">
      <div className="landing-page-player-container">
        <div className="landing-page-player">
          {winner ? <h2> Winner {username}</h2> : <h2> {username} Turn</h2>}
        </div>
      </div>
      <Board setWinner={setWinner} />
    </div>
  );
}

export default LandingPage;

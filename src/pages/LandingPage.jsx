import './LandingPage.css';
import { useState } from 'react';
import Board from '../components/Board';

function LandingPage() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  return (
    <div className="landing-page">
      <div className="landing-page-player-container">
        <div className="landing-page-player">
          {winner ? <h2> Winner Player {currentPlayer}</h2> : <h2> Player {currentPlayer} Turn</h2>}
        </div>
      </div>
      <Board
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setWinner={setWinner}
      />
    </div>
  );
}

export default LandingPage;

import './LandingPage.css';
import { useState } from 'react';
import Board from '../components/Board';

function LandingPage() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  return (
    <div className="landingPage">
      <h2>Player {currentPlayer} Turn</h2>
      <Board currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} />
    </div>
  );
}

export default LandingPage;

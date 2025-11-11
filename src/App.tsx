import { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage.jsx';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  function handlePlay(i) {}

  function changePlayer() {}

  function checkWinner() {}

  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;

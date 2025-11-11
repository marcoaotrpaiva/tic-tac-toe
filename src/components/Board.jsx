import Square from './Square';
import './Board.css';
import { useState } from 'react';

function Board({ currentPlayer, setCurrentPlayer }) {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleSquareClick(squareIndex) {
    if (squares[squareIndex]) return;
    const newSquares = [...squares];
    newSquares[squareIndex] = currentPlayer;
    setSquares(newSquares);
    const winner = checkWinner(newSquares);
    if (winner) {
      console.log(winner);
    }
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  function checkWinner(board) {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of winningPositions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          squareValue={value}
          handleSquareClick={() => handleSquareClick(index)}
        />
      ))}
    </div>
  );
}

export default Board;

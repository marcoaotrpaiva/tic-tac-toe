import { useEffect, useState } from 'react';
import Square from './Square';
import { Socket } from 'socket.io-client';
import './Board.css';

interface BoardProps {
  socket: Socket;
  roomId: string;
  symbol: 'X' | 'O';
  disabled: boolean; // <--- ADDED
}

export default function Board({ socket, roomId, symbol, disabled }: BoardProps) {
  const [squares, setSquares] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');

  // Opponent Move Listener
  useEffect(() => {
    const handleOpponentMove = ({
      index,
      symbol: moveSymbol,
    }: {
      index: number;
      symbol: 'X' | 'O';
    }) => {
      updateSquare(index, moveSymbol, false);
      setCurrentPlayer(moveSymbol === 'X' ? 'O' : 'X');
    };

    socket.on('opponent_move', handleOpponentMove);

    return () => {
      socket.off('opponent_move', handleOpponentMove);
    };
  }, [socket, squares]);

  function updateSquare(index: number, playerSymbol: 'X' | 'O', isMyMove: boolean) {
    const newSquares = [...squares];
    newSquares[index] = playerSymbol;
    setSquares(newSquares);

    const winner = checkWinner(newSquares);
    if (winner) {
      setTimeout(() => alert(`${winner} WINS!`), 50);
      return;
    }

    if (isMyMove) {
      setCurrentPlayer(playerSymbol === 'X' ? 'O' : 'X');
    }
  }

  function handleSquareClick(squareIndex: number) {
    if (disabled) {
      // <--- ADDED
      console.log('Waiting for second player...');
      return;
    }

    if (currentPlayer !== symbol) return;
    if (squares[squareIndex]) return;

    updateSquare(squareIndex, symbol, true);

    socket.emit('move', {
      roomId,
      index: squareIndex,
      symbol,
    });
  }

  function checkWinner(board: (null | 'X' | 'O')[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  return (
    <div className="board-game">
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

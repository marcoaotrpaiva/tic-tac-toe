import './Square.css';
interface SquareProps {
  squareValue: 'X' | 'O' | null;
  handleSquareClick: () => void;
}

export default function Square({ squareValue, handleSquareClick }: SquareProps) {
  return (
    <button className={`square ${squareValue ? squareValue : ''}`} onClick={handleSquareClick}>
      {squareValue}
    </button>
  );
}

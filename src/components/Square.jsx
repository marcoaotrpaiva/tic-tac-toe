function Square({ squareValue, handleSquareClick }) {
  return <button onClick={handleSquareClick}>{squareValue}</button>;
}

export default Square;

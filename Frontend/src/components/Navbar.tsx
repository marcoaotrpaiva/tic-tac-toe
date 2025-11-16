import './Navbar.css';

function Navbar() {
  return (
    <>
      <div className="navbar-container">
        <nav className="navbar">
          <div className="navbar-item navbar-item-left">
            <ul className="navbar-list">
              <li>Home</li>
              <li>Leaderboard</li>
              <li>About</li>
            </ul>
          </div>
          <div className="navbar-item navbar-item-center">TICTACTOE</div>
          <div className="navbar-item navbar-item-right" style={{ padding: 10 }}>
            MP
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;

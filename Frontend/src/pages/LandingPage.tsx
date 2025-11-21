import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import createGuest from '../utils/generateGuestPlayer';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  const navigate = useNavigate();

  function handleGuestPlay() {
    const guest = createGuest();
    navigate('/profile', { state: { user: guest } });
  }
  function handleLogin() {
    navigate('/login');
  }

  return (
    <div className="landing-container">
      <Navbar />

      {/* CONTENT */}
      <div className="page-content">
        <h1 className="title">Tic-Tac-Toe</h1>

        <div className="board-wrapper">
          <div className="board-circle"></div>
          <div className="board">
            <div className="v-line"></div>
            <div className="v-line"></div>
            <div className="h-line"></div>
            <div className="h-line"></div>
            <div className="static-board">
              <div className="cell cell-left">✕</div>
              <div className="cell"></div>
              <div className="cell">◯</div>

              <div className="cell"></div>
              <div className="cell">✕</div>
              <div className="cell"></div>

              <div className="cell cell-bottom ">◯</div>
              <div className="cell"></div>
              <div className="cell cell-bottom">✕</div>
            </div>
          </div>
        </div>

        <div className="buttons-section">
          <button className="btn-guest" onClick={handleGuestPlay}>
            Play as Guest
          </button>

          <p className="or-text">or</p>

          <button className="btn-login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

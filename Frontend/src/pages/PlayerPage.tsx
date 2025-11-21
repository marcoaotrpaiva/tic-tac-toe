import './PlayerPage.css';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PlayerCard from '../components/PlayerCard';
export default function PlayerPage() {
  const { state } = useLocation();
  const user = state?.user;

  return (
    <div className="user-page-container">
      <Navbar />
      <div className="user-page">
        <div className="user-page-player-card">
          <PlayerCard player={user} />
        </div>
      </div>
    </div>
  );
}

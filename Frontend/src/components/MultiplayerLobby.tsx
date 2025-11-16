import { useNavigate } from 'react-router-dom';

export default function MultiplayerLobby() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <h1>Multiplayer Lobby</h1>

      <button onClick={() => navigate('/play')}>Enter Multiplayer</button>
    </div>
  );
}

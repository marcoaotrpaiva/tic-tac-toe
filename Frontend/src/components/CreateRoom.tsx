import { generateRoomId } from '../utils/generateRoomId';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CreateRoom() {
  const { state } = useLocation();
  const player = state?.player;
  const navigate = useNavigate();
  const makeRoom = () => {
    const roomId = generateRoomId();
    navigate(`/room/${roomId}`, { state: { player } });
  };

  return <button onClick={makeRoom}>Create Room</button>;
}

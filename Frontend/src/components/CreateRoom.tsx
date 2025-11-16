import { generateRoomId } from '../utils/generateRoomId';
import { useNavigate } from 'react-router-dom';

export default function CreateRoom() {
  const navigate = useNavigate();

  const makeRoom = () => {
    const roomId = generateRoomId();
    navigate(`/room/${roomId}`);
  };

  return <button onClick={makeRoom}>Create Room</button>;
}

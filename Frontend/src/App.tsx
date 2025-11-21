import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CreateRoom from './components/CreateRoom';
import Room from './components/Room';
import PlayerPage from './pages/PlayerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/createRoom" element={<CreateRoom />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<PlayerPage />} />
        <Route path="/login" element={<LoginPage key="login" />} />
        <Route path="/register" element={<LoginPage key="register" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

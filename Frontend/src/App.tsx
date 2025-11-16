import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CreateRoom from './components/CreateRoom';
import Room from './components/Room';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateRoom />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/game" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

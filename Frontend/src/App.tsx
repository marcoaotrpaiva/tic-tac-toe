import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import TestSocket from './components/TestSocket';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestSocket />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/game" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

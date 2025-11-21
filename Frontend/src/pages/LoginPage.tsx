import './LoginPage.css';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
export default function LoginPage() {
  const { pathname } = useLocation();
  const mode = pathname === '/login' ? 'login' : 'register';

  return (
    <>
      <Navbar />
      <div className="login-page-container">
        <LoginForm mode={mode} />
      </div>
    </>
  );
}

import './LoginPage.css';
import Leaderboard from '../components/Leaderboard';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
function LoginPage() {
  return (
    <div className="login-page-container">
      <Navbar />
      <LoginForm />
    </div>
  );
}

export default LoginPage;

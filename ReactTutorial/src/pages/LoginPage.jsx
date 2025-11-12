import './LoginPage.css';
import Leaderboard from '../components/Leaderboard';
import LoginForm from '../components/LoginForm';
function LoginPage() {
  return (
    <div className="login-page-container">
      <LoginForm />
      <Leaderboard />
    </div>
  );
}

export default LoginPage;

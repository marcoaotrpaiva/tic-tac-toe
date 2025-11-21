import './LoginForm.css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Toast from './Toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type Inputs = {
  password: string;
  username: string;
  confirmPassword: string;
};

function LoginForm({ mode }: { mode: 'login' | 'register' }) {
  const [toast, setToast] = useState('');
  const navigate = useNavigate();
  const isLogin = mode === 'login';
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const endpoint = isLogin ? 'login' : 'register';

      const payload = {
        username: data.username,
        password: data.password,
      };

      //console.log('📤 Sending payload:', payload);

      const res = await axios.post(`http://localhost:4000/api/auth/${endpoint}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      //console.log('✅ Auth response:', res.data);
      if (isLogin) {
        console.log(res.data.user);
        //logined user send all object
        navigate('/profile', {
          state: { user: res.data.user },
        });
      } else {
        //registred user
        setToast('Registado com sucesso');
        setTimeout(() => {
          navigate('/login', { state: { username: payload.username, wins: 0, losses: 0 } });
        }, 500);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="form-container">
      {toast && <Toast message={toast} />}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="username"
          className="form-input form-input-username"
          {...register('username', { required: true })}
        />

        <input
          type="password"
          placeholder="password"
          autoComplete="new-password"
          className="form-input"
          {...register('password', { required: true })}
        />

        {!isLogin && (
          <>
            <input
              type="password"
              placeholder="Confirm password"
              className="form-input"
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
            />

            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}
          </>
        )}

        <button className="form-button-submit" type="submit">
          {isLogin ? 'Login' : 'Register'}
        </button>

        <h1
          className="form-text-options"
          onClick={() => {
            reset();
            navigate(isLogin ? '/register' : '/login');
          }}
        >
          {isLogin ? 'Register' : 'Login'}
        </h1>
      </form>
    </div>
  );
}

export default LoginForm;

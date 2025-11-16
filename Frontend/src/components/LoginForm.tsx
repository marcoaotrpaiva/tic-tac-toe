import './LoginForm.css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  password: string;
  username: string;
  confirmPassword: string;
};
function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLogin, setIsLogin] = useState(true);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { confirmPassword, ...payload } = data;
      try {
        const endpoint = isLogin ? 'login' : 'register';
        console.log('Payload being sent:', payload, typeof payload);

        const res = await axios.post(`http://localhost:4000/api/auth/${endpoint}/`, payload);
        console.log('', res.data);
        if (res) {
          navigate('/game', { state: { username: payload.username } });
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err: any) {
      console.error('❌ Error:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };
  console.log(watch('username'));
  console.log(watch('password'));
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="username"
          className="form-input form-input-username"
          {...register('username', { required: true })}
        />
        <input
          type="password"
          placeholder="password "
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
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
            />

            {/* 🚀 SHOW THE ERROR HERE */}
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}
          </>
        )}
        <button className="form-button-submit">{isLogin ? 'Login' : 'Register'}</button>
        <h1 className="form-text-options" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}{' '}
        </h1>
      </form>
    </div>
  );
}

export default LoginForm;

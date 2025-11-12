import './LoginForm.css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

type Inputs = {
  password: string;
  username: string;
};
function LoginForm() {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const [isLogin, setIsLogin] = useState(true);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      try {
        const endpoint = isLogin ? 'login' : 'register';
        const res = await axios.post(`http://localhost:4000/api/auth/${endpoint}`, data);
        console.log('', res.data);
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
        <input {...register('username', { required: true })} />
        <input {...register('password', { required: true })} />

        <input type="submit" />
        <p onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register Here' : 'Login Here'}</p>
      </form>
    </div>
  );
}

export default LoginForm;

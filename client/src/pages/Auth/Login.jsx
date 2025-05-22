import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {AuthWrapper} from './AuthWrapper';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('Login successful:', response.data);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <div className='flex justify-center items-center h-screen'>
      <div className="container">
        <div className="heading">Sign In</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            required
            className="input"
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            required
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            className="login-button"
            type="submit"
            value={loading ? 'Signing In...' : 'Sign In'}
            disabled={loading}
          />

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </form>

         <p className="agreement text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="!text-lg font-bold">
            Sign up
          </Link>
      </p>
      </div>
      </div>
    </AuthWrapper>
  );
};



export default Login;

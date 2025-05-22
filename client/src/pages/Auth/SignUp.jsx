import React, { useState } from 'react';
import {AuthWrapper} from './AuthWrapper';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('SignUp successful:', response.data);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <div className='flex justify-center items-center h-screen'>
      <div className="container">
        <div className="heading">Sign Up</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            required
            className="input"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
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
            value={loading ? 'Creating Account...' : 'Sign Up'}
            disabled={loading}
          />

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </form>
           <p className="agreement text-center mt-4">
          Have an account?{" "}
          <Link to="/login" className="!text-lg font-bold">
            Sign up
          </Link>
      </p>

      </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;

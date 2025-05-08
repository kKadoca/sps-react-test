import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import authService from '../services/authService';
import handleError from '../helpers/error';
import { isAxiosError } from 'axios';
import './loginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      navigate('/users');
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        toast('E-mail ou senha inválidos!', {
          hideProgressBar: true,
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
        });
      }
      handleError(error);
    };
  }

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        <div className='text-center'>
          <h1>Login</h1>
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;

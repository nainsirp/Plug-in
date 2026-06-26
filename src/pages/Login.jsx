import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const { login, navigateTo } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', padding: '40px 20px', minHeight: '80vh' }}>
      <h1 className="section-title text-glow">Welcome Back</h1>
      
      <div className="glass-card" style={{ padding: '30px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-cta" style={{ width: '100%', marginTop: '10px' }}>
            Log In
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <a 
              style={{ color: 'var(--accent-cyan)', cursor: 'pointer' }}
              onClick={() => navigateTo('register')}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

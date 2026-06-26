import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Register = () => {
  const { register, navigateTo } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    password: '',
    refCode: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData.name, formData.email, formData.whatsapp, formData.password);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', padding: '40px 20px', minHeight: '80vh' }}>
      <h1 className="section-title text-glow">Create Account</h1>
      
      <div className="glass-card" style={{ padding: '30px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required 
            />
          </div>
          <div className="form-group">
            <label>WhatsApp Number</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Optional"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required 
            />
          </div>
          <div className="form-group">
            <label>Referral Code (Optional)</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Did a friend refer you?"
              value={formData.refCode}
              onChange={(e) => setFormData({ ...formData, refCode: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-cta" style={{ width: '100%', marginTop: '10px' }}>
            Sign Up
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <a 
              style={{ color: 'var(--accent-cyan)', cursor: 'pointer' }}
              onClick={() => navigateTo('login')}
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

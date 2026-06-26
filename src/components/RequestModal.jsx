import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const RequestModal = () => {
  const { requestModalOpen, setRequestModalOpen } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: '', whatsapp: '', itemName: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const handleClose = () => {
    setRequestModalOpen(false);
    // Reset form for next open
    if (status === 'success') {
      setFormData({ name: '', whatsapp: '', itemName: '' });
      setStatus('idle');
    }
  };

  return (
    <>
      {/* Request Plugin Floating Button */}
      <button 
        onClick={() => setRequestModalOpen(true)} 
        style={{
          position: 'fixed',
          left: '20px',
          bottom: '20px',
          background: 'var(--accent-cyan)',
          color: '#000',
          border: 'none',
          padding: '15px 20px',
          borderRadius: '30px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 5px 15px rgba(0,245,255,0.4)',
          zIndex: 9998,
          fontSize: '14px',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        + Request Plugin
      </button>

      {/* Request Plugin Modal */}
      {requestModalOpen && (
        <div 
          className="modal-overlay"
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)'
          }}
        >
          <div 
            className="glass-card" 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '400px',
              padding: '30px',
              position: 'relative'
            }}
          >
            <button 
              onClick={handleClose} 
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h2 style={{ color: 'var(--accent-green)', marginBottom: '15px' }}>
                  Sent Successfully! ✅
                </h2>
                <p style={{ color: '#ccc' }}>Thanks for your request. We will try to add it soon!</p>
                <button 
                  onClick={handleClose} 
                  className="btn btn-outline" 
                  style={{ marginTop: '20px' }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ marginBottom: '20px', color: 'var(--accent-cyan)' }}>
                  What are you looking for?
                </h3>
                <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '20px' }}>
                  Tell us which plugin or sample pack you want, and we'll add it ASAP!
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ width: '100%', boxSizing: 'border-box' }}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                      WhatsApp Number
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ width: '100%', boxSizing: 'border-box' }}
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                      Plugin/Pack Name
                    </label>
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      style={{ width: '100%', boxSizing: 'border-box' }}
                      placeholder="e.g. Omnisphere 2, KSHMR Vol 4..."
                      value={formData.itemName}
                      onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%' }}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending...' : 'Submit Request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RequestModal;

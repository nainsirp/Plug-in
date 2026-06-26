import React, { useState, useEffect } from 'react';

const Announcement = () => {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = midnight - now;

      if (diff <= 0) {
        setTimeLeft('00:00:00');
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
      const mins = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, '0');
      const secs = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
      
      setTimeLeft(`${hours}:${mins}:${secs}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(90deg, #0f0c29, #302b63, #24243e)',
      borderBottom: '1px solid rgba(0, 229, 255, 0.3)',
      color: '#fff',
      textAlign: 'center',
      padding: '12px',
      fontSize: '0.95rem',
      zIndex: 10000,
      position: 'relative',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '10px'
    }}>
      <span>
        <span style={{ color: '#00E5FF', textShadow: '0 0 10px rgba(0,229,255,0.6)' }}>⚡ MASSIVE SALE:</span> Unlock 30% OFF when you bundle 4+ products!
      </span>
      <span style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '4px 10px',
        borderRadius: '4px',
        border: '1px solid rgba(255,255,255,0.2)',
        fontSize: '0.9rem'
      }}>
        Ends in: <span style={{ color: '#FFD700', fontFamily: 'monospace', fontWeight: 'bold' }}>{timeLeft}</span>
      </span>
    </div>
  );
};

export default Announcement;

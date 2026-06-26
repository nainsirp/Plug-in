import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { products } from '../data/products';

const Lottery = () => {
  const { navigateTo } = useContext(AppContext);
  const lotteryItem = products.find(p => p.category === 'lottery');
  
  // Calculate remaining time for the draw
  const [timeLeft, setTimeLeft] = useState('Loading...');

  useEffect(() => {
    if (!lotteryItem) return;

    const updateTimer = () => {
      const end = lotteryItem.endTime * 1000;
      const now = new Date().getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft('ENDED');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [lotteryItem]);

  const handleShare = () => {
    if (!lotteryItem) return;
    const url = window.location.origin + '/lottery';
    const shareText = `I just found this awesome giveaway for ${lotteryItem.name} at A TO Z PLUGINS! Join now:`;

    if (navigator.share) {
      navigator.share({
        title: `${lotteryItem.name} Giveaway!`,
        text: shareText,
        url: url
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(`${shareText} ${url}`).then(() => {
        alert('Share link copied to clipboard! Share it with your friends.');
      }).catch(err => {
        alert(`Link: ${url}`);
      });
    }
  };

  const handleEnterLottery = (e) => {
    e.preventDefault();
    // Simulate entry checkout
    navigateTo('cart');
  };

  if (!lotteryItem) return <div className="container">No active lottery.</div>;

  return (
    <div style={{ paddingTop: '40px', minHeight: '80vh' }} className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="section-title text-glow" style={{ color: '#ffcc00' }}>
          A TO Z PLUGINS LOTTERY 🎁
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Win premium studio gear like Headphones, Audio Monitors, MIDI Keyboards, and Interfaces for a fraction of the cost!
        </p>
      </div>

      <div className="product-grid" style={{ gap: '40px', gridTemplateColumns: '1fr', maxWidth: '600px', margin: '0 auto' }}>
        <div className="glass-card product-card" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden', 
          border: '1px solid rgba(255, 204, 0, 0.3)' 
        }}>
          {/* Entry Tag */}
          <div style={{ position: 'relative', padding: '20px', textAlign: 'center', background: 'rgba(0,0,0,0.3)' }}>
            <span style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: '#ffcc00',
              color: '#000',
              padding: '5px 12px',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              boxShadow: '0 0 15px rgba(255, 204, 0, 0.5)'
            }}>
              ENTRY: ₹{lotteryItem.price}
            </span>
            <img 
              src={lotteryItem.image} 
              alt={lotteryItem.name} 
              style={{
                height: '200px',
                margin: '0 auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          <div className="content" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '25px' }}>
            <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.4rem', marginBottom: '5px' }}>
              {lotteryItem.name}
            </h3>
            <p style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '15px', fontWeight: 'bold' }}>
              Number of Winners: <span style={{ color: 'var(--accent-green)' }}>{lotteryItem.winners}</span>
            </p>

            {/* Progress Bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px', color: 'var(--text-muted)' }}>
                <span>Members Joined</span>
                <span>
                  <strong style={{ color: '#ffcc00' }}>{lotteryItem.membersJoined}</strong> / {lotteryItem.membersRequired}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${(lotteryItem.membersJoined / lotteryItem.membersRequired) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ffcc00, var(--accent-green))',
                  transition: 'width 0.5s ease-in-out'
                }}></div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#ff3333', marginTop: '5px' }}>
                * Must reach {lotteryItem.membersRequired} members for draw to happen.
              </p>
            </div>

            {/* Timer */}
            <div style={{
              marginBottom: '20px',
              background: 'rgba(0,0,0,0.5)',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ends In:</p>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '1.5rem',
                color: 'var(--accent-cyan)',
                fontWeight: 'bold',
                letterSpacing: '2px'
              }}>
                {timeLeft}
              </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px' }}>
              <button 
                onClick={handleEnterLottery}
                className="btn btn-cta" 
                style={{
                  width: '100%',
                  fontSize: '1.1rem',
                  padding: '12px',
                  background: 'linear-gradient(45deg, #ffcc00, #ff8c00)',
                  color: '#000',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Enter Lottery Now
              </button>
              <button 
                onClick={handleShare}
                className="btn btn-outline" 
                style={{
                  padding: '12px 15px',
                  borderColor: 'var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Share with friends"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lottery;

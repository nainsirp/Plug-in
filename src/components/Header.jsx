import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { activePage, navigateTo, cart, isLoggedIn, logout } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (page) => {
    navigateTo(page);
    setMenuOpen(false);
  };

  const handleAuth = () => {
    setMenuOpen(false);
    if (isLoggedIn) {
      logout();
    } else {
      navigateTo('login');
    }
  };

  return (
    <header className="glass" style={{ top: 0, position: 'sticky', zIndex: 9999 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a 
          href="/" 
          className="logo text-glow" 
          onClick={(e) => { e.preventDefault(); handleNav('home'); }}
        >
          A TO Z PLUGINS
        </a>
        
        <button 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ fontSize: '24px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          &#9776;
        </button>

        <nav className={menuOpen ? 'open' : ''}>
          <ul>
            <li>
              <a 
                className={activePage === 'home' ? 'text-glow' : ''} 
                style={{ color: activePage === 'home' ? 'var(--accent-cyan)' : '' }}
                onClick={() => handleNav('home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                className={activePage === 'daw' ? 'text-glow' : ''} 
                style={{ color: activePage === 'daw' ? 'var(--accent-cyan)' : '' }}
                onClick={() => handleNav('daw')}
              >
                DAW
              </a>
            </li>
            <li>
              <a 
                className={activePage === 'vst' ? 'text-glow' : ''} 
                style={{ color: activePage === 'vst' ? 'var(--accent-cyan)' : '' }}
                onClick={() => handleNav('vst')}
              >
                VST & Plugins
              </a>
            </li>
            <li>
              <a 
                className={activePage === 'samples' ? 'text-glow' : ''} 
                style={{ color: activePage === 'samples' ? 'var(--accent-cyan)' : '' }}
                onClick={() => handleNav('samples')}
              >
                Sample Packs
              </a>
            </li>
            <li>
              <a 
                className={activePage === 'courses' ? 'text-glow' : ''} 
                style={{ color: activePage === 'courses' ? 'var(--accent-cyan)' : '' }}
                onClick={() => handleNav('courses')}
              >
                Courses
              </a>
            </li>
            <li>
              <a 
                className={activePage === 'lottery' ? 'text-glow' : ''} 
                style={{ color: '#ffcc00', fontWeight: 'bold', textShadow: '0 0 10px rgba(255, 204, 0, 0.5)' }}
                onClick={() => handleNav('lottery')}
              >
                Lottery 🎁
              </a>
            </li>
            <li>
              <a 
                className={activePage === 'cart' ? 'text-glow' : ''} 
                style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}
                onClick={() => handleNav('cart')}
              >
                Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
              </a>
            </li>
            <li>
              <a 
                className={activePage === 'about' ? 'text-glow' : ''} 
                style={{ color: activePage === 'about' ? 'var(--accent-cyan)' : '' }}
                onClick={() => handleNav('about')}
              >
                About
              </a>
            </li>
            <li>
              <a 
                style={{ color: isLoggedIn ? '#ff3333' : '' }}
                onClick={handleAuth}
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

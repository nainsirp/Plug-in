import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Footer = () => {
  const { navigateTo } = useContext(AppContext);

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <a 
            href="/" 
            className="logo text-glow" 
            style={{ display: 'inline-block', marginBottom: '20px' }}
            onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
          >
            A TO Z PLUGINS
          </a>
          <p>Your Ultimate Music Plugin Destination.</p>
        </div>
        <div className="footer-bottom">
          &copy; 2026 A TO Z PLUGINS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

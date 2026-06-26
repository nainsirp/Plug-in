import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './context/AppContext';

// Layout & Global Components
import Announcement from './components/Announcement';
import Header from './components/Header';
import Footer from './components/Footer';
import RequestModal from './components/RequestModal';
import SupportChat from './components/SupportChat';

// Page Views
import Home from './pages/Home';
import DAW from './pages/DAW';
import VST from './pages/VST';
import Samples from './pages/Samples';
import Courses from './pages/Courses';
import Lottery from './pages/Lottery';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { activePage, cartToast, navigateTo } = useContext(AppContext);
  const [wipVisible, setWipVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('wipToastDismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setWipVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissWipToast = () => {
    setWipVisible(false);
    sessionStorage.setItem('wipToastDismissed', 'true');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'daw':
        return <DAW />;
      case 'vst':
        return <VST />;
      case 'samples':
        return <Samples />;
      case 'courses':
        return <Courses />;
      case 'lottery':
        return <Lottery />;
      case 'product':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'about':
        return <About />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      default:
        return <Home />;
    }
  };

  const cartToastBottom = wipVisible ? '170px' : '20px';

  return (
    <>
      <Announcement />
      <Header />
      
      <main style={{ minHeight: '80vh' }}>
        {renderPage()}
      </main>

      <Footer />

      {/* Floating Request Plugin button & modal */}
      <RequestModal />

      {/* Floating Support Chat bubble & widget */}
      <SupportChat />

      {/* Added to Cart Notification Toast */}
      {cartToast.visible && (
        <div className="glass" style={{
          position: 'fixed',
          bottom: cartToastBottom,
          right: '20px',
          padding: '15px 20px',
          borderRadius: '12px',
          borderLeft: '4px solid var(--accent-green, #00ff00)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          background: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(10px)',
          animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{ color: 'var(--accent-green, #00ff00)', fontSize: '24px' }}>🛒</div>
          <div>
            <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '16px' }}>Added to Cart</h4>
            <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>{cartToast.productName} added successfully.</p>
          </div>
          <button 
            onClick={() => navigateTo('cart')}
            className="btn btn-outline" 
            style={{ padding: '6px 12px', fontSize: '12px', marginLeft: 'auto', cursor: 'pointer' }}
          >
            View Cart
          </button>
        </div>
      )}

      {/* WIP Notification Toast */}
      {wipVisible && (
        <div className="glass" style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          maxWidth: '350px',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '4px solid var(--accent-cyan, #00F5FF)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '15px',
          background: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(10px)',
          animation: 'slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{ flexShrink: 0, color: 'var(--accent-cyan, #00F5FF)', fontSize: '24px' }}>🔔</div>
          <div>
            <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '16px' }}>Work in Progress</h4>
            <p style={{ margin: 0, color: '#aaa', fontSize: '14px', lineHeight: 1.4 }}>
              This website is still under process. We are adding new plugins and sample packs day by day!
            </p>
          </div>
          <button 
            onClick={dismissWipToast}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '24px',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
              outline: 'none',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
            onMouseOut={(e) => e.currentTarget.style.color = '#888'}
          >
            &times;
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

export default App;

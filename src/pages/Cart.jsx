import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, isLoggedIn, navigateTo, clearCart } = useContext(AppContext);
  
  // Coupon Countdown timer
  const [fomoTime, setFomoTime] = useState('30:00');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setFomoTime('00:00');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    setFomoTime(`${m}:${s}`);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  // 30% discount if bundle size is 4+
  const isBundleActive = totalItemCount >= 4;
  const discount = isBundleActive ? subtotal * 0.3 : 0;
  const total = subtotal - discount;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigateTo('login');
      return;
    }

    // Simulate Checkout Success
    setCheckoutSuccess(true);
    clearCart();
  };

  if (checkoutSuccess) {
    return (
      <div className="container" style={{ paddingTop: '80px', minHeight: '80vh', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '50px', maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--accent-green)', marginBottom: '15px' }}>Order Placed Successfully! 🎉</h2>
          <p style={{ color: '#ccc', marginBottom: '25px', lineHeight: 1.6 }}>
            Thank you for your purchase. We have sent the download links to your registered email address and WhatsApp number.
          </p>
          <button onClick={() => { setCheckoutSuccess(false); navigateTo('home'); }} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px', minHeight: '80vh' }}>
      {/* Active Coupon Banner */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(255, 0, 85, 0.8), rgba(255, 204, 0, 0.8))',
        color: '#fff',
        padding: '15px 20px',
        textAlign: 'center',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 5px 25px rgba(255, 0, 85, 0.3)',
        border: '1px solid rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontSize: '1.1rem', fontWeight: 600, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          ⚡ Your Bundle Discount Coupon is Active! Add 4+ products to get 30% off automatically.
        </span>
        <span style={{
          background: '#000',
          color: '#ffcc00',
          padding: '8px 20px',
          borderRadius: '30px',
          fontFamily: 'monospace',
          fontSize: '1.4rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          boxShadow: 'inset 0 0 10px rgba(255,204,0,0.2)'
        }}>
          {fomoTime}
        </span>
      </div>

      <h1 className="section-title text-glow">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '50px' }}>
          <h3 style={{ marginBottom: '20px' }}>Your cart is empty</h3>
          <button onClick={() => navigateTo('home')} className="btn btn-outline" style={{ fontSize: '1.1rem' }}>
            Browse Products
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }} className="flex-mobile-col">
          {/* Cart Table */}
          <div className="glass-card table-responsive" style={{ padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.product.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                        />
                        <span style={{ fontWeight: 'bold' }}>{item.product.name}</span>
                      </div>
                    </td>
                    <td>₹{item.product.price}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '25px', height: '25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '25px', height: '25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{(item.product.price * item.quantity).toFixed(2)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ background: 'rgba(255,51,51,0.15)', border: 'none', color: '#ff3333', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              Order Summary
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Items Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {isBundleActive && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--accent-green)' }}>
                <span>Bundle Discount (30% OFF)</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '30px', 
              paddingTop: '15px', 
              borderTop: '1px dashed rgba(255,255,255,0.1)',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              <span>Total Price</span>
              <span style={{ color: 'var(--accent-cyan)' }}>₹{total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="btn btn-cta" 
              style={{ width: '100%', fontSize: '1.1rem', padding: '14px', borderRadius: '8px' }}
            >
              {isLoggedIn ? 'Proceed to Checkout ⚡' : 'Log In to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

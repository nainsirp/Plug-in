import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ProductDetail = () => {
  const { activeProduct, addToCart, navigateTo, isLoggedIn, reviews, addReview } = useContext(AppContext);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  if (!activeProduct) {
    return <div className="container" style={{ padding: '120px 20px' }}>Product not found.</div>;
  }

  const handleBuyNow = () => {
    addToCart(activeProduct);
    navigateTo('cart');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview(activeProduct.id, newComment, newRating);
    setNewComment('');
    setNewRating(5);
  };

  const productReviews = reviews[activeProduct.id] || [];

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      {/* Product Information */}
      <div className="product-detail">
        <div className="img-wrap glass-card" style={{ padding: '10px', height: 'fit-content' }}>
          <img src={activeProduct.image} alt={activeProduct.name} style={{ borderRadius: '8px' }} />
        </div>
        <div className="info glass-card" style={{ padding: '30px' }}>
          <h1 className="text-glow" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
            {activeProduct.name}
          </h1>
          <div className="price" style={{ fontSize: '2rem', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '20px' }}>
            ₹{activeProduct.price}
          </div>
          
          <p style={{ color: '#ccc', lineHeight: 1.6 }}>{activeProduct.description}</p>
          
          {activeProduct.features && activeProduct.features.length > 0 && (
            <>
              <h3 style={{ marginTop: '20px', color: '#fff' }}>Features</h3>
              <ul className="features" style={{ margin: '15px 0', paddingLeft: '20px', color: '#aaa' }}>
                {activeProduct.features.map((feat, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>{feat}</li>
                ))}
              </ul>
            </>
          )}
          
          {activeProduct.os && (
            <p style={{ margin: '20px 0', fontSize: '0.95rem' }}>
              <strong>OS Support:</strong> {activeProduct.os}
            </p>
          )}
          
          {/* Installation Guide for DAWs & VSTs */}
          {(activeProduct.category === 'daw' || activeProduct.category === 'vst') && (
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ marginBottom: '15px' }}>Installation Guide</h3>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
                <iframe 
                  src={activeProduct.video || "https://www.youtube.com/embed/Ri7Y7wczk3s"} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
                  allowFullScreen
                  title="Installation walkthrough video"
                ></iframe>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex-mobile-col" style={{ marginTop: '35px', display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => addToCart(activeProduct)}
              className="btn btn-outline" 
              style={{
                flex: 1,
                fontSize: '1.15rem',
                padding: '18px',
                textAlign: 'center',
                borderRadius: '8px',
                transition: 'all 0.3s',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="btn btn-primary" 
              style={{
                flex: 1,
                fontSize: '1.15rem',
                padding: '18px',
                textAlign: 'center',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00C853, #64DD17)',
                color: '#fff',
                fontWeight: 700,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,200,83,0.3)',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,200,83,0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,200,83,0.3)';
              }}
            >
              Buy Now ⚡
            </button>
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: '25px',
            color: '#888',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px'
          }}>
            <span style={{ display: 'flex', alignItem: 'center', gap: '6px' }}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginTop: '3px' }}>
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
              </svg>
              Secure Checkout
            </span>
            <span style={{ display: 'flex', alignItem: 'center', gap: '6px' }}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginTop: '3px' }}>
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              Instant Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div id="reviews" style={{ marginTop: '50px', paddingBottom: '40px' }}>
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Customer Reviews</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {/* Reviews List */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {productReviews.length === 0 ? (
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                  No reviews yet. Be the first to leave a review!
                </div>
              ) : (
                productReviews.map((rev, i) => (
                  <div key={i} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{rev.author}</strong>
                        <div style={{ color: 'var(--accent-green)', fontSize: '1.2rem', marginTop: '5px' }}>
                          {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {rev.date}
                      </div>
                    </div>
                    <p style={{ margin: 0, color: '#e0e0e0', lineHeight: 1.5 }}>{rev.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Write a Review Form */}
          <div>
            <div className="glass-card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
              <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--accent-cyan)' }}>Write a Review</h3>
              
              {!isLoggedIn ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    You must be logged in to write a review.
                  </p>
                  <button 
                    onClick={() => navigateTo('login')}
                    className="btn btn-outline" 
                    style={{ padding: '10px 25px', cursor: 'pointer' }}
                  >
                    Log In to Review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <label>Rating</label>
                    <select 
                      className="form-control"
                      value={newRating}
                      onChange={(e) => setNewRating(e.target.value)}
                      style={{ background: 'rgba(0,0,0,0.8)' }}
                    >
                      <option value="5">★★★★★ (5 Stars)</option>
                      <option value="4">★★★★☆ (4 Stars)</option>
                      <option value="3">★★★☆☆ (3 Stars)</option>
                      <option value="2">★★☆☆☆ (2 Stars)</option>
                      <option value="1">★☆☆☆☆ (1 Star)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Review Comment</label>
                    <textarea 
                      className="form-control"
                      rows="4"
                      required
                      placeholder="Share your experience with this product..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-cta" style={{ width: '100%' }}>
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

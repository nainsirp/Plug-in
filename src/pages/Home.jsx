import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { navigateTo } = useContext(AppContext);

  // Original homepage featured products: FL Studio 25, Ableton Live 12, Logic Pro X, Serum, FabFilter Pro-Q, Sounds of KSHMR Vol 2
  const featuredIds = ['1', 'daw_2', 'daw_3', '2', 'vst_3', '3'];
  const featuredProducts = products.filter(p => featuredIds.includes(p.id));

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 800, 
            marginBottom: '20px', 
            lineHeight: 1.2, 
            letterSpacing: '-1px', 
            color: '#fff' 
          }}>
            Your Ultimate Music Plugin Destination
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '30px', 
            color: '#a0a0a5', 
            maxWidth: '600px', 
            marginLeft: 'auto', 
            marginRight: 'auto', 
            lineHeight: 1.6 
          }}>
            Premium DAW templates, state-of-the-art VST Plugins, and professional Sample Packs designed for modern music production.
          </p>
          <button 
            onClick={() => navigateTo('vst')}
            className="btn btn-primary" 
            style={{ 
              fontSize: '1.1rem', 
              padding: '14px 35px', 
              borderRadius: '30px', 
              background: '#fff', 
              color: '#000', 
              fontWeight: 600, 
              letterSpacing: '0.5px', 
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Explore the Collection
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="section container">
        <h2 className="section-title text-glow">Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

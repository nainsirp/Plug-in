import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const VST = () => {
  const [selectedOS, setSelectedOS] = useState('windows');

  const vstProducts = products.filter(p => p.category === 'vst');
  const filteredProducts = vstProducts.filter(p => p.os.toLowerCase() === selectedOS);

  return (
    <div style={{ paddingTop: '40px', minHeight: '80vh' }} className="container">
      <h1 className="section-title text-glow">VST & Plugins</h1>
      
      {/* OS Selector Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
        <button 
          onClick={() => setSelectedOS('windows')} 
          style={{
            background: selectedOS === 'windows' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
            color: selectedOS === 'windows' ? '#000' : '#fff',
            border: selectedOS === 'windows' ? 'none' : '1px solid rgba(255,255,255,0.2)',
            padding: '12px 30px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: selectedOS === 'windows' ? '0 4px 15px rgba(0,229,255,0.4)' : 'none'
          }}
        >
          🖥️ Windows
        </button>
        <button 
          onClick={() => setSelectedOS('mac')} 
          style={{
            background: selectedOS === 'mac' ? '#ffcc00' : 'rgba(255,255,255,0.1)',
            color: selectedOS === 'mac' ? '#000' : '#fff',
            border: selectedOS === 'mac' ? 'none' : '1px solid rgba(255,255,255,0.2)',
            padding: '12px 30px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: selectedOS === 'mac' ? '0 4px 15px rgba(255,204,0,0.4)' : 'none'
          }}
        >
          🍎 Mac
        </button>
      </div>
      
      {/* OS Specific Warning & Grid */}
      {selectedOS === 'mac' && (
        <div style={{
          background: 'rgba(255, 51, 51, 0.1)',
          border: '1px solid rgba(255, 51, 51, 0.3)',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '30px',
          color: '#ff3333',
          fontSize: '0.95rem',
          display: 'flex',
          gap: '15px',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '2rem', lineHeight: 1 }}>⚠️</div>
          <div>
            <strong style={{ display: 'block', marginBottom: '5px', fontSize: '1.1rem' }}>Mac Installation Notice</strong>
            Mac installation can sometimes be complex. Download and install at your own risk. There is <strong>STRICTLY NO REFUND</strong> for Mac users once purchased, but the plugin/VST is guaranteed to be in full working condition.
          </div>
        </div>
      )}

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default VST;

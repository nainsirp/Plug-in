import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { navigateTo } = useContext(AppContext);

  const getButtonText = () => {
    if (product.category === 'courses') return 'Enroll';
    if (product.category === 'lottery') return 'Enter Lottery';
    return 'Details';
  };

  const handleDetailsClick = (e) => {
    e.preventDefault();
    if (product.category === 'lottery') {
      navigateTo('lottery');
    } else {
      navigateTo('product', product);
    }
  };

  return (
    <div className="product-card" style={{
      background: '#15151a',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <a 
        href={`/product.php?id=${product.id}`}
        style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}
        onClick={handleDetailsClick}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          className="card-img"
        />
      </a>
      <div className="content" style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
          <a 
            href={`/product.php?id=${product.id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
            onClick={handleDetailsClick}
          >
            {product.name}
          </a>
        </h3>
        <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '20px', lineHeight: 1.5, flex: 1 }}>
          {product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description}
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginTop: 'auto', 
          paddingTop: '15px', 
          borderTop: '1px solid rgba(255,255,255,0.05)' 
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Price
            </span>
            <span style={{ color: 'var(--accent-cyan)', fontSize: '1.3rem', fontWeight: 800 }}>
              ₹{product.price}
            </span>
          </div>
          <a 
            href={`/product.php?id=${product.id}`}
            className="card-action-btn"
            style={{ 
              background: 'rgba(0, 229, 255, 0.1)', 
              border: '1px solid rgba(0, 229, 255, 0.3)', 
              color: '#00E5FF', 
              padding: '10px 20px', 
              borderRadius: '6px', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.5px', 
              transition: 'all 0.3s ease', 
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={handleDetailsClick}
          >
            {getButtonText()}
          </a>
        </div>
      </div>
      
      <style>{`
        .product-card:hover {
          border-color: rgba(0, 229, 255, 0.3) !important;
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.1) !important;
          transform: translateY(-5px) !important;
        }
        .product-card:hover .card-img {
          transform: scale(1.08) !important;
        }
        .card-action-btn:hover {
          background: #00E5FF !important;
          color: #000 !important;
          box-shadow: 0 0 15px rgba(0,229,255,0.4) !important;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;

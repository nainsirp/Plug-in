import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Samples = () => {
  const sampleProducts = products.filter(p => p.category === 'samples');

  return (
    <div style={{ paddingTop: '40px', minHeight: '80vh' }} className="container">
      <h1 className="section-title text-glow">Sample Packs</h1>
      
      <div className="product-grid">
        {sampleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Samples;

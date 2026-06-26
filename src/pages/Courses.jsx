import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Courses = () => {
  const courseProducts = products.filter(p => p.category === 'courses');

  return (
    <div style={{ paddingTop: '40px', minHeight: '80vh' }} className="container">
      <h1 className="section-title text-glow">Mixing & Mastering Courses</h1>
      
      <div className="product-grid">
        {courseProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Courses;

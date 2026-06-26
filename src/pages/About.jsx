import React from 'react';

const About = () => {
  return (
    <div className="container" style={{ paddingTop: '40px', minHeight: '80vh' }}>
      <div className="glass-card" style={{ padding: '40px' }}>
        <h1 className="section-title text-glow" style={{ marginBottom: '30px' }}>About Us</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '20px', lineHeight: 1.7, color: '#e0e0e0' }}>
          A TO Z PLUGINS was founded by passionate music producers who understand the value of premium tools. 
          We provide a curated selection of the industry's best DAWs, VST plugins, and sample packs to elevate your sound.
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '20px', lineHeight: 1.7, color: '#e0e0e0' }}>
          Our mission is to empower creators with zero amateur aesthetics and zero missing features. 
          We are dedicated to offering top-tier digital assets with a dark, premium feel that matches the quality of the products we sell.
        </p>
      </div>
    </div>
  );
};

export default About;

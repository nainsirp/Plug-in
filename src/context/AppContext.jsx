import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [activeProduct, setActiveProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  // Modal & Widget states
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  
  // Toast notifications
  const [cartToast, setCartToast] = useState({ visible: false, productName: '' });
  
  // Customer Reviews state
  const [reviews, setReviews] = useState({
    "1": [
      {
        author: "PRAHALLAD RAGHAVENDRA APARANJI",
        rating: 4,
        date: "15 Jun 2026",
        text: "very nice and trusted"
      }
    ]
  });

  // Load cart from sessionStorage on init
  useEffect(() => {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }

    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Error parsing user", e);
      }
    }
  }, []);

  // Save cart to sessionStorage
  const saveCart = (newCart) => {
    setCart(newCart);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.product.id === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { product, quantity: 1 }];
    }
    saveCart(newCart);
    
    // Show Toast
    setCartToast({ visible: true, productName: product.name });
    setTimeout(() => {
      setCartToast({ visible: false, productName: '' });
    }, 4000);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.product.id !== productId);
    saveCart(newCart);
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const navigateTo = (page, productObj = null) => {
    setActivePage(page);
    if (productObj) {
      setActiveProduct(productObj);
    }
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const login = (email, password) => {
    // Simulated login
    const userData = { name: email.split('@')[0].toUpperCase(), email };
    setUser(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem('user', JSON.stringify(userData));
    navigateTo('home');
  };

  const register = (name, email, whatsapp, password) => {
    // Simulated registration
    const userData = { name: name.toUpperCase(), email, whatsapp };
    setUser(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem('user', JSON.stringify(userData));
    navigateTo('home');
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('user');
    navigateTo('home');
  };

  const addReview = (productId, reviewText, rating) => {
    const date = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    const newReview = {
      author: user ? user.name : "ANONYMOUS PRODUCER",
      rating: parseInt(rating),
      date,
      text: reviewText
    };

    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newReview]
    }));
  };

  return (
    <AppContext.Provider value={{
      activePage,
      activeProduct,
      cart,
      isLoggedIn,
      user,
      requestModalOpen,
      chatOpen,
      cartToast,
      reviews,
      setRequestModalOpen,
      setChatOpen,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      navigateTo,
      login,
      register,
      logout,
      addReview,
      setCartToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

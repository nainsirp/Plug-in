import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';

const SupportChat = () => {
  const { chatOpen, setChatOpen, isLoggedIn, navigateTo, user } = useContext(AppContext);
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Hey there! Welcome to A TO Z PLUGINS Support. How can we help you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const msgBoxRef = useRef(null);

  useEffect(() => {
    if (chatOpen && msgBoxRef.current) {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }
  }, [chatOpen, messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate Agent Reply after 1 second
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: 'agent',
        text: "Thanks for your message! Our team is checking this. For immediate downloads or active licensing support, feel free to text us directly on WhatsApp."
      }]);
    }, 1200);
  };

  return (
    <div id="global-chat-widget" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      fontFamily: 'sans-serif'
    }}>
      {/* Chat Bubble Button */}
      <button 
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--accent-cyan)',
          color: '#000',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 5px 20px rgba(0, 245, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s',
          position: 'relative'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
        </svg>
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          width: '350px',
          height: '450px',
          background: 'var(--card-color, #1a1a1a)',
          border: '1px solid rgba(0, 245, 255, 0.3)',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Header */}
          <div style={{
            background: 'rgba(0,245,255,0.1)',
            borderBottom: '1px solid var(--accent-cyan)',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--accent-green)',
                boxShadow: '0 0 8px var(--accent-green)'
              }}></div>
              <h4 style={{ margin: 0, color: '#fff', fontSize: '1rem' }}>Support Chat</h4>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}
            >
              &times;
            </button>
          </div>
          
          {/* Notice Banner */}
          <div style={{
            background: 'rgba(255, 204, 0, 0.1)',
            borderBottom: '1px solid rgba(255, 204, 0, 0.2)',
            padding: '6px 10px',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#ffcc00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            lineHeight: 1.2
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
            <span><strong>Notice:</strong> Messages & links auto-delete in 30 days. Save your data.</span>
          </div>

          {/* Messages Area */}
          <div 
            ref={msgBoxRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: 'rgba(0,0,0,0.3)'
            }}
          >
            {!isLoggedIn ? (
              <div style={{ margin: 'auto', textAlign: 'center', padding: '10px' }}>
                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '15px' }}>
                  Please log in to chat with support or access your downloads.
                </p>
                <button 
                  onClick={() => { setChatOpen(false); navigateTo('login'); }}
                  className="btn btn-primary" 
                  style={{ padding: '8px 15px', fontSize: '0.9rem' }}
                >
                  Log In / Sign Up
                </button>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div 
                  key={i} 
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    background: msg.sender === 'user' ? 'rgba(0, 245, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                    border: msg.sender === 'user' ? '1px solid rgba(0, 245, 255, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    lineHeight: '1.4'
                  }}
                >
                  <div style={{
                    fontSize: '0.7rem',
                    color: msg.sender === 'user' ? 'var(--accent-cyan)' : '#888',
                    marginBottom: '3px',
                    fontWeight: 'bold'
                  }}>
                    {msg.sender === 'user' ? (user ? user.name : 'YOU') : 'SUPPORT'}
                  </div>
                  {msg.text}
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          {isLoggedIn && (
            <form 
              onSubmit={handleSendMessage}
              style={{
                display: 'flex',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: '#151515',
                padding: '10px'
              }}
            >
              <input 
                type="text" 
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button 
                type="submit" 
                style={{
                  background: 'var(--accent-cyan)',
                  border: 'none',
                  color: '#000',
                  padding: '0 15px',
                  borderRadius: '6px',
                  marginLeft: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Send
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default SupportChat;

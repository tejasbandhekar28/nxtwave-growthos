import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onRegisterClick, isLive, isDemo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(221, 245, 255, 0.88)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.65)',
      boxShadow: '0 4px 15px rgba(169, 209, 227, 0.25)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo / Brand */}
        <div 
          onClick={() => scrollTo('hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #EAF9FF, #CDE9F7)',
            boxShadow: '4px 4px 10px #A9D1E3, -4px -4px 10px #FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sparkles size={20} color="#12356B" strokeWidth={2.4} />
          </div>
          <div>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              NxtWave
            </div>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              GrowthOS
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '28px',
        }} className="desktop-nav">
          <button 
            onClick={() => scrollTo('hero')} 
            className="nav-link"
          >
            Home
          </button>
          <button 
            onClick={() => scrollTo('live-counter')} 
            className="nav-link"
          >
            Live Counter
          </button>
          <button 
            onClick={() => scrollTo('about-workshop')} 
            className="nav-link"
          >
            About Workshop
          </button>
          <button 
            onClick={() => scrollTo('what-you-build')} 
            className="nav-link"
          >
            What You'll Build
          </button>

          <button
            onClick={onRegisterClick}
            className="neumorphic-button neumorphic-button-primary"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            Register Now
            <ArrowRight size={16} />
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="neumorphic-button mobile-toggle"
          style={{ padding: '8px', borderRadius: '12px', display: 'none' }}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} color="var(--text-primary)" /> : <Menu size={20} color="var(--text-primary)" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '20px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          <button onClick={() => scrollTo('hero')} className="nav-link" style={{ textAlign: 'left', padding: '8px 0' }}>
            Home
          </button>
          <button onClick={() => scrollTo('live-counter')} className="nav-link" style={{ textAlign: 'left', padding: '8px 0' }}>
            Live Counter
          </button>
          <button onClick={() => scrollTo('about-workshop')} className="nav-link" style={{ textAlign: 'left', padding: '8px 0' }}>
            About Workshop
          </button>
          <button onClick={() => scrollTo('what-you-build')} className="nav-link" style={{ textAlign: 'left', padding: '8px 0' }}>
            What You'll Build
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onRegisterClick(); }}
            className="neumorphic-button neumorphic-button-primary"
            style={{ width: '100%', marginTop: '8px' }}
          >
            Register Now
          </button>
        </div>
      )}
    </header>
  );
}


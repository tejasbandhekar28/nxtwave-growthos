import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.7)',
      backgroundColor: 'var(--surface)',
      padding: '40px 24px 32px 24px',
      marginTop: '40px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #EAF9FF, #CDE9F7)',
            boxShadow: '2px 2px 5px #A9D1E3, -2px -2px 5px #FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sparkles size={16} color="#12356B" />
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            NxtWave GrowthOS
          </span>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '480px' }}>
          Free Online Workshop: <strong>“Build Your First AI Project in 60 Minutes”</strong> — Empowering engineering students with practical AI skills.
        </p>

        {/* Quick Nav Links */}
        <div style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          fontSize: '0.84rem',
        }}>
          <button onClick={() => scrollTo('hero')} className="nav-link">Home</button>
          <button onClick={() => scrollTo('live-counter')} className="nav-link">Live Status</button>
          <button onClick={() => scrollTo('what-you-build')} className="nav-link">Curriculum</button>
          <button onClick={() => scrollTo('registration-form')} className="nav-link">Register</button>
        </div>

        {/* Simple Copyright */}
        <div style={{
          fontSize: '0.76rem',
          color: 'var(--text-muted)',
          marginTop: '12px',
          borderTop: '1px solid rgba(169, 209, 227, 0.3)',
          paddingTop: '16px',
          width: '100%',
          maxWidth: '600px',
        }}>
          © {new Date().getFullYear()} NxtWave GrowthOS. Workshop & Registration Portal for Final-Year Engineers.
        </div>
      </div>
    </footer>
  );
}


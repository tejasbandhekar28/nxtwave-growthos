import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA({ onRegisterClick }) {
  return (
    <section style={{
      padding: '40px 24px 60px 24px',
      maxWidth: '920px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      <div className="neumorphic-card" style={{
        padding: '44px 32px',
        background: 'linear-gradient(135deg, #EAF9FF 0%, #D9F0FA 100%)',
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #FFFFFF, #D6EDF8)',
          boxShadow: '4px 4px 10px #A9D1E3, -4px -4px 10px #FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
        }}>
          <Sparkles size={26} color="#12356B" />
        </div>

        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: '12px',
        }}>
          Ready to Build Your First AI Project?
        </h2>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '560px',
          margin: '0 auto 28px auto',
          lineHeight: 1.5,
        }}>
          Take the first step toward practical AI learning. Join hundreds of your engineering peers today.
        </p>

        <button
          onClick={onRegisterClick}
          className="neumorphic-button neumorphic-button-primary"
          style={{ padding: '15px 36px', fontSize: '1.05rem', fontWeight: 700 }}
        >
          Register for Free
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}


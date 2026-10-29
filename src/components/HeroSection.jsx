import React from 'react';
import { Sparkles, ArrowRight, BookOpen, CheckCircle2, Cpu } from 'lucide-react';

export default function HeroSection({ onRegisterClick, onExploreClick }) {
  return (
    <section id="hero" style={{
      padding: '60px 24px 40px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      {/* 3 Benefit Badges */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '28px',
      }}>
        <span className="neumorphic-badge badge-demo" style={{ padding: '6px 16px', fontSize: '0.78rem' }}>
          <Sparkles size={14} color="#12356B" /> 100% Free Workshop
        </span>
        <span className="neumorphic-badge badge-info" style={{ padding: '6px 16px', fontSize: '0.78rem' }}>
          <CheckCircle2 size={14} color="#367FA8" /> Beginner Friendly
        </span>
        <span className="neumorphic-badge badge-success" style={{ padding: '6px 16px', fontSize: '0.78rem' }}>
          <Cpu size={14} color="#126348" /> Hands-on AI Learning
        </span>
      </div>

      {/* Main Heading */}
      <h1 style={{
        fontSize: 'clamp(2.3rem, 5.5vw, 3.8rem)',
        fontWeight: 800,
        color: 'var(--text-primary)',
        letterSpacing: '-0.03em',
        lineHeight: 1.15,
        maxWidth: '920px',
        margin: '0 auto 20px auto',
      }}>
        Build Your First AI Project in 60 Minutes
      </h1>

      {/* Supporting Text */}
      <p style={{
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        color: 'var(--text-secondary)',
        maxWidth: '740px',
        margin: '0 auto 36px auto',
        lineHeight: 1.6,
      }}>
        Discover the power of Artificial Intelligence by building your first AI project in a practical, beginner-friendly workshop designed for engineering students.
      </p>

      {/* Primary & Secondary Call to Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '18px',
        flexWrap: 'wrap',
        marginBottom: '48px',
      }}>
        <button
          onClick={onRegisterClick}
          className="neumorphic-button neumorphic-button-primary"
          style={{ padding: '15px 34px', fontSize: '1.05rem', fontWeight: 700 }}
        >
          Register for Free
          <ArrowRight size={18} />
        </button>

        <button
          onClick={onExploreClick}
          className="neumorphic-button"
          style={{ padding: '15px 28px', fontSize: '1.02rem', fontWeight: 600 }}
        >
          <BookOpen size={18} />
          Explore Workshop
        </button>
      </div>

      {/* Neumorphic AI Visual Floating Card */}
      <div className="neumorphic-card" style={{
        maxWidth: '820px',
        margin: '0 auto',
        padding: '24px 32px',
        background: 'linear-gradient(135deg, #EAF9FF 0%, #D9F0FA 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="neumorphic-icon-plate" style={{ width: '42px', height: '42px', borderRadius: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>⚡</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>60-Min Practical</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Live interactive coding</div>
          </div>
        </div>

        <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(169, 209, 227, 0.4)' }} className="divider-line" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="neumorphic-icon-plate" style={{ width: '42px', height: '42px', borderRadius: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>🧠</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Generative AI & LLMs</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>No advanced math required</div>
          </div>
        </div>

        <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(169, 209, 227, 0.4)' }} className="divider-line" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="neumorphic-icon-plate" style={{ width: '42px', height: '42px', borderRadius: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>🚀</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Project for Portfolio</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Ready for placement interviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}


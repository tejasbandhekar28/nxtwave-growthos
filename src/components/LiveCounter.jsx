import React, { useState, useEffect, useRef } from 'react';
import { Radio, Users, Target, RefreshCw, AlertCircle } from 'lucide-react';
import { getRegistrationCount, supabase, isSupabaseConfigured } from '../services/api';

export default function LiveCounter({ refreshTrigger }) {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [schemaPending, setSchemaPending] = useState(false);
  const isMounted = useRef(true);

  const TARGET_GOAL = 500;

  // Function to fetch the genuine database count
  const fetchCount = async () => {
    try {
      setError(null);
      const res = await getRegistrationCount();
      if (!isMounted.current) return;

      setCount(res.count);
      setIsDemoMode(Boolean(res.isDemo));
      setSchemaPending(Boolean(res.schemaPending));
    } catch (err) {
      if (!isMounted.current) return;
      setError('Could not retrieve current count.');
      console.error(err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchCount();

    // 1. Supabase Realtime Subscription setup (if Supabase is configured)
    let channel = null;
    if (isSupabaseConfigured && supabase) {
      channel = supabase
        .channel('public:registrations-counter')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'registrations' },
          (payload) => {
            console.log('Realtime registration event received:', payload);
            // Refresh aggregate count directly from DB to preserve privacy
            fetchCount();
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setIsLiveActive(true);
          } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
            setIsLiveActive(false);
          }
        });
    }

    // 2. Safe 10-second polling fallback to guarantee consistency
    const pollInterval = setInterval(() => {
      fetchCount();
    }, 10000);

    return () => {
      isMounted.current = false;
      clearInterval(pollInterval);
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, [refreshTrigger]);

  const displayCount = count !== null ? count : 0;
  const progressPercentage = Math.min(((displayCount / TARGET_GOAL) * 100), 100).toFixed(1);

  return (
    <section id="live-counter" style={{
      padding: '20px 24px 50px 24px',
      maxWidth: '860px',
      margin: '0 auto',
    }}>
      <div className="neumorphic-card" style={{
        padding: '36px 32px',
        textAlign: 'center',
        background: 'linear-gradient(145deg, #EAF9FF, #D9F0FA)',
        border: '1px solid rgba(255, 255, 255, 0.7)',
      }}>
        {/* Top Live Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: isLiveActive 
              ? 'rgba(38, 155, 115, 0.15)' 
              : 'rgba(18, 53, 107, 0.08)',
            border: isLiveActive 
              ? '1px solid rgba(38, 155, 115, 0.3)' 
              : '1px solid rgba(18, 53, 107, 0.15)',
          }}>
            <Radio 
              size={14} 
              color={isLiveActive ? '#269B73' : '#12356B'} 
              className={isLiveActive ? 'animate-pulse' : ''} 
            />
            <span style={{
              fontSize: '0.76rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isLiveActive ? '#126348' : 'var(--text-primary)',
            }}>
              {isLiveActive ? 'LIVE REALTIME UPDATES' : 'LIVE REGISTRATION STATUS'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isDemoMode && (
              <span className="neumorphic-badge badge-demo" style={{ fontSize: '0.7rem' }}>
                DEMO MODE
              </span>
            )}
            <button
              onClick={fetchCount}
              className="neumorphic-icon-plate"
              style={{ width: '32px', height: '32px', cursor: 'pointer', borderRadius: '10px' }}
              title="Refresh Count"
              aria-label="Refresh Count"
            >
              <RefreshCw size={14} color="var(--text-secondary)" className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Section Heading & Subtitle */}
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '6px',
        }}>
          Students are joining the AI learning journey
        </h2>
        <p style={{
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          marginBottom: '28px',
        }}>
          Real-time count of confirmed engineering student seats
        </p>

        {/* Big Numbers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          maxWidth: '520px',
          margin: '0 auto 28px auto',
        }}>
          {/* Card: Total Registrations */}
          <div className="neumorphic-inset" style={{ padding: '20px 16px' }}>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}>
              <Users size={15} color="var(--primary-dark)" />
              Total Registrations
            </div>

            <div style={{
              fontSize: 'clamp(2.4rem, 6vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              fontFamily: 'var(--font-mono)',
            }}>
              {loading && count === null ? '...' : displayCount.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Database verified
            </div>
          </div>

          {/* Card: Target */}
          <div className="neumorphic-inset" style={{ padding: '20px 16px' }}>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}>
              <Target size={15} color="var(--primary-dark)" />
              Target Goal
            </div>

            <div style={{
              fontSize: 'clamp(2.4rem, 6vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              fontFamily: 'var(--font-mono)',
            }}>
              {TARGET_GOAL}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Engineering students
            </div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <div className="neumorphic-progress-track" style={{ height: '14px', marginBottom: '10px' }}>
            <div 
              className="neumorphic-progress-fill" 
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.84rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
          }}>
            <span>
              <strong style={{ color: 'var(--text-primary)' }}>{progressPercentage}%</strong> of the target reached
            </span>
            <span>
              {Math.max(TARGET_GOAL - displayCount, 0)} seats remaining
            </span>
          </div>
        </div>

        {/* Notice if Supabase schema is waiting to be run */}
        {schemaPending && (
          <div style={{
            marginTop: '20px',
            padding: '10px 14px',
            borderRadius: '12px',
            backgroundColor: 'rgba(231, 167, 68, 0.15)',
            border: '1px solid rgba(231, 167, 68, 0.4)',
            color: '#8C5B0D',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            <AlertCircle size={15} />
            <span>Note: Run <code>supabase/schema.sql</code> in your Supabase SQL Editor to activate live database tables.</span>
          </div>
        )}
      </div>
    </section>
  );
}


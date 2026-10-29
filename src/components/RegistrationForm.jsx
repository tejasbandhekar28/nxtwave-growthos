import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { registerStudent } from '../services/api';

export default function RegistrationForm({ onRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    college: '',
    branch: 'Computer Science & Engg (CSE)',
    graduationYear: '2025',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const branches = [
    'Computer Science & Engg (CSE)',
    'AI & Machine Learning (AI/ML)',
    'Data Science / Cyber Security',
    'Information Technology (IT)',
    'Electronics & Communication (ECE)',
    'Electrical & Electronics (EEE)',
    'Mechanical / Civil Engineering',
    'Other Engineering Discipline'
  ];

  const graduationYears = ['2025', '2026', '2024', '2027', '2028'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // 1. Validation: Trim whitespace & check required fields
    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedCollege = formData.college.trim();

    if (!trimmedName) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!trimmedCollege) {
      setErrorMsg('Please enter your college name.');
      return;
    }

    setLoading(true);

    try {
      const res = await registerStudent({
        fullName: trimmedName,
        email: trimmedEmail,
        college: trimmedCollege,
        branch: formData.branch,
        graduationYear: formData.graduationYear,
      });

      if (res.success) {
        setIsSuccess(true);
        setSuccessMsg("You're registered! Welcome to the AI learning journey.");

        // Clear the form fields after successful registration
        setFormData({
          fullName: '',
          email: '',
          college: '',
          branch: 'Computer Science & Engg (CSE)',
          graduationYear: '2025',
        });

        // Trigger confetti celebration
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#78BFE0', '#367FA8', '#269B73', '#FFFFFF'],
        });

        // Notify parent component to refresh live counter immediately
        if (onRegistrationSuccess) {
          onRegistrationSuccess();
        }
      }
    } catch (err) {
      // Preserve form values on error so student doesn't have to retype
      setErrorMsg(err.message || 'Registration could not be completed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="registration-form" style={{
      padding: '40px 24px 60px 24px',
      maxWidth: '680px',
      margin: '0 auto',
    }}>
      <div className="neumorphic-card" style={{ padding: '38px 34px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="neumorphic-badge badge-demo" style={{ marginBottom: '8px' }}>
            Instant Confirmation
          </span>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '6px',
          }}>
            Reserve Your Free Seat
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Join hundreds of engineering students building their first AI project.
          </p>
        </div>

        {/* Success Confirmation Banner */}
        {isSuccess && (
          <div className="neumorphic-card-sm" style={{
            padding: '16px 20px',
            marginBottom: '24px',
            backgroundColor: '#D8F5E9',
            borderColor: 'rgba(38, 155, 115, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <CheckCircle2 size={24} color="#126348" />
            <div>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#126348' }}>
                {successMsg}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#126348', marginTop: '2px' }}>
                Your registration has been saved and the live counter updated.
              </div>
            </div>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="neumorphic-card-sm" style={{
            padding: '14px 18px',
            marginBottom: '22px',
            backgroundColor: '#FFEBF0',
            borderColor: '#FFCCD5',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <AlertCircle size={20} color="#D95C70" />
            <div style={{ fontSize: '0.86rem', color: '#9E2238', fontWeight: 600 }}>
              {errorMsg}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Full Name <span style={{ color: '#D95C70' }}>*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Ananya Sharma"
              value={formData.fullName}
              onChange={handleChange}
              className="neumorphic-input"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Email Address <span style={{ color: '#D95C70' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. ananya@college.edu or name@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="neumorphic-input"
              required
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Strict database uniqueness rule prevents duplicate registrations.
            </span>
          </div>

          {/* College Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              College Name <span style={{ color: '#D95C70' }}>*</span>
            </label>
            <input
              type="text"
              name="college"
              placeholder="e.g. VNR Vignana Jyothi Institute of Engineering"
              value={formData.college}
              onChange={handleChange}
              className="neumorphic-input"
              required
            />
          </div>

          {/* Engineering Branch & Graduation Year (2-Column Grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Engineering Branch <span style={{ color: '#D95C70' }}>*</span>
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="neumorphic-input"
                style={{ cursor: 'pointer' }}
              >
                {branches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Graduation Year <span style={{ color: '#D95C70' }}>*</span>
              </label>
              <select
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className="neumorphic-input"
                style={{ cursor: 'pointer' }}
              >
                {graduationYears.map((yr) => (
                  <option key={yr} value={yr}>{yr} {yr === '2025' ? '(Final Year)' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="neumorphic-button neumorphic-button-primary"
            style={{
              marginTop: '12px',
              padding: '15px 28px',
              fontSize: '1.02rem',
              fontWeight: 700,
              width: '100%',
            }}
          >
            {loading ? 'Confirming Registration...' : 'Register for Free'}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

